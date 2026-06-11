@extends('noi-bo.layout')

@section('title', 'Quản lý Banner - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .banner-container {
        max-width: 800px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .banner-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .banner-card h2 {
        font-size: 20px;
        margin-bottom: 8px;
        color: #111827;
    }
    .banner-card .subtitle {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 24px;
    }
    .current-banner {
        margin-bottom: 24px;
    }
    .current-banner label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .current-banner img {
        width: 100%;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        object-fit: cover;
        max-height: 300px;
    }
    .upload-zone {
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        padding: 32px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        margin-bottom: 20px;
        background: #fafbfc;
    }
    .upload-zone:hover {
        border-color: #2563EB;
        background: #eff6ff;
    }
    .upload-zone.dragover {
        border-color: #2563EB;
        background: #dbeafe;
    }
    .upload-zone svg {
        width: 40px;
        height: 40px;
        color: #9ca3af;
        margin-bottom: 12px;
    }
    .upload-zone p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
    }
    .upload-zone .hint {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 6px;
    }
    .upload-zone input {
        display: none;
    }
    .preview-new {
        display: none;
        margin-bottom: 20px;
    }
    .preview-new img {
        width: 100%;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        object-fit: cover;
        max-height: 250px;
    }
    .preview-new .preview-label {
        font-size: 12px;
        font-weight: 600;
        color: #2563EB;
        margin-bottom: 8px;
        display: block;
    }
    .btn-submit {
        width: 100%;
        padding: 12px;
        background: #2563EB;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn-submit:hover {
        background: #1E3A8A;
    }
    .btn-submit:disabled {
        background: #93c5fd;
        cursor: not-allowed;
    }
    .alert {
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        margin-bottom: 20px;
    }
    .alert-success {
        background: #dbeafe;
        color: #1e40af;
        border: 1px solid #93c5fd;
    }
    .alert-danger {
        background: #fcebeb;
        color: #a32d2d;
        border: 1px solid #fca5a5;
    }
    .alert ul {
        margin: 0;
        padding-left: 20px;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="banner-container">
        <div class="banner-card">
            <h2>Quản lý Banner Trang chủ</h2>
            <p class="subtitle">Upload ảnh banner mới để hiển thị trên trang chủ website. Khuyến nghị kích thước 1920×600px.</p>

            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if($banner)
            <div class="current-banner">
                <label>Banner hiện tại</label>
                <img src="{{ $banner->image_path }}" alt="Banner hiện tại">
            </div>
            @endif

            <form method="POST" action="/admin/banner" enctype="multipart/form-data" id="bannerForm">
                @csrf

                <div class="upload-zone" id="uploadZone">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                    </svg>
                    <p>Nhấn hoặc kéo thả ảnh vào đây</p>
                    <p class="hint">Hỗ trợ: JPG, PNG, WebP — Tối đa 5MB</p>
                    <input type="file" name="banner_image" id="bannerInput" accept="image/jpeg,image/png,image/webp">
                </div>

                <div class="preview-new" id="previewNew">
                    <span class="preview-label">Ảnh mới sẽ thay thế:</span>
                    <img id="previewImg" src="" alt="Preview">
                </div>

                <button type="submit" class="btn-submit" id="submitBtn" disabled>Cập nhật Banner</button>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('bannerInput');
    const preview = document.getElementById('previewNew');
    const previewImg = document.getElementById('previewImg');
    const submitBtn = document.getElementById('submitBtn');

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            input.files = e.dataTransfer.files;
            showPreview(e.dataTransfer.files[0]);
        }
    });

    input.addEventListener('change', () => {
        if (input.files.length) {
            showPreview(input.files[0]);
        }
    });

    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
            submitBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});
</script>
@endsection
