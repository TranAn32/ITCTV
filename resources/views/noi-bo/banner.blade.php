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
        max-width: 1000px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .banner-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
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

    /* Gallery Styles */
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    .gallery-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid #e5e7eb;
        transition: border-color 0.2s;
    }
    .gallery-item.active {
        border-color: #2563EB;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }
    .gallery-item img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
    }
    .gallery-item-actions {
        padding: 12px;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .filename {
        font-size: 12px;
        color: #4b5563;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
    }
    .btn-activate {
        padding: 6px 12px;
        background: #fff;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 12px;
        color: #374151;
        cursor: pointer;
        transition: all 0.2s;
    }
    .btn-activate:hover {
        background: #f3f4f6;
    }
    .active-badge {
        font-size: 12px;
        font-weight: 600;
        color: #2563EB;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .active-badge svg {
        width: 16px;
        height: 16px;
    }
    .btn-delete {
        background: none;
        border: none;
        color: #ef4444;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
    }
    .btn-delete:hover {
        background: #fee2e2;
    }
    .btn-delete svg {
        width: 18px;
        height: 18px;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="banner-container">
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

        <div class="banner-card">
            <h2>Tải lên Banner mới</h2>
            <p class="subtitle">Upload ảnh banner mới để thêm vào thư viện. Khuyến nghị kích thước 1920×600px.</p>

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
                    <span class="preview-label">Bản xem trước:</span>
                    <img id="previewImg" src="" alt="Preview">
                </div>

                <button type="submit" class="btn-submit" id="submitBtn" disabled>Tải lên</button>
            </form>
        </div>

        <div class="banner-card">
            <h2>Thư viện Banner</h2>
            <p class="subtitle">Quản lý các banner đã tải lên. Chọn một banner để đặt làm banner hiển thị trên trang chủ.</p>
            
            <div class="gallery-grid">
                @forelse($banners as $bannerItem)
                    @php 
                        $isActive = $activeBanner && $activeBanner->image_path === $bannerItem['filename'];
                    @endphp
                    <div class="gallery-item {{ $isActive ? 'active' : '' }}">
                        <img src="{{ $bannerItem['url'] }}" alt="{{ $bannerItem['filename'] }}">
                        <div class="gallery-item-actions">
                            <span class="filename" title="{{ $bannerItem['filename'] }}">{{ $bannerItem['filename'] }}</span>
                            
                            <div style="display: flex; gap: 8px; align-items: center;">
                                @if($isActive)
                                    <span class="active-badge">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Đang hiển thị
                                    </span>
                                @else
                                    <form method="POST" action="/admin/banner/activate" style="margin: 0;">
                                        @csrf
                                        <input type="hidden" name="filename" value="{{ $bannerItem['filename'] }}">
                                        <button type="submit" class="btn-activate">Chọn hiển thị</button>
                                    </form>
                                @endif

                                @if(!$isActive)
                                    <form method="POST" action="/admin/banner/delete" style="margin: 0;" onsubmit="return confirm('Bạn có chắc chắn muốn xóa banner này?');">
                                        @csrf
                                        <input type="hidden" name="filename" value="{{ $bannerItem['filename'] }}">
                                        <button type="submit" class="btn-delete" title="Xóa">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    </div>
                @empty
                    <p style="color: #6b7280; font-size: 14px; grid-column: 1/-1; text-align: center; padding: 20px;">
                        Chưa có banner nào. Hãy tải lên banner đầu tiên của bạn!
                    </p>
                @endforelse
            </div>
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
