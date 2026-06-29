@extends('noi-bo.layout')

@section('title', 'Đăng tin mới - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .news-container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .news-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .news-card h2 {
        font-size: 20px;
        margin-bottom: 8px;
        color: #111827;
        font-weight: 750;
    }
    .news-card .subtitle {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 24px;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .form-group label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
    }
    .form-control {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
        color: #1f2937;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }
    .form-control:focus {
        border-color: #2563EB;
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    textarea.form-control {
        resize: vertical;
        min-height: 120px;
    }
    .upload-zone {
        border: 2px dashed #cbd5e1;
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
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
        width: 32px;
        height: 32px;
        color: #94a3b8;
        margin-bottom: 8px;
    }
    .upload-zone p {
        font-size: 13px;
        color: #6b7280;
        margin: 0;
    }
    .upload-zone .hint {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 4px;
    }
    .upload-zone input {
        display: none;
    }
    .preview-new {
        display: none;
        margin-top: 15px;
    }
    .preview-new img {
        width: 100%;
        max-width: 350px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        object-fit: cover;
        max-height: 180px;
    }
    .btn-group {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 32px;
    }
    .btn-submit {
        padding: 11px 24px;
        background: #2563EB;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn-submit:hover {
        background: #1D4ED8;
    }
    .btn-cancel {
        padding: 11px 24px;
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        text-align: center;
        transition: all 0.2s;
    }
    .btn-cancel:hover {
        background: #e2e8f0;
        color: #1e293b;
    }
    .alert-danger {
        background: #fcebeb;
        color: #a32d2d;
        border: 1px solid #fca5a5;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        margin-bottom: 20px;
    }
    .alert-danger ul {
        margin: 0;
        padding-left: 20px;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="news-container">
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="news-card">
            <h2>Đăng bài viết mới</h2>
            <p class="subtitle">Nhập đầy đủ thông tin bên dưới để tạo bài viết tin tức mới.</p>

            <form method="POST" action="/admin/news" enctype="multipart/form-data" id="newsForm">
                @csrf

                <div class="form-group">
                    <label for="title">Tiêu đề tin tức</label>
                    <input type="text" name="title" id="title" class="form-control" placeholder="Nhập tiêu đề tin tức..." required value="{{ old('title') }}">
                </div>

                <div class="form-group">
                    <label for="summary">Tóm tắt ngắn</label>
                    <textarea name="summary" id="summary" class="form-control" placeholder="Mô tả tóm tắt ngắn của bài viết (tối đa 500 ký tự)..." required maxlength="500">{{ old('summary') }}</textarea>
                </div>

                <div class="form-group">
                    <label for="content">Nội dung bài viết</label>
                    <textarea name="content" id="content" class="form-control" style="min-height: 250px" placeholder="Viết nội dung bài viết chi tiết..." required>{{ old('content') }}</textarea>
                </div>

                <div class="form-group">
                    <label for="is_visible">Trạng thái đăng bài</label>
                    <select name="is_visible" id="is_visible" class="form-control">
                        <option value="1" {{ old('is_visible', '1') == '1' ? 'selected' : '' }}>Hiển thị ngay</option>
                        <option value="0" {{ old('is_visible') == '0' ? 'selected' : '' }}>Ẩn bài viết</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="created_at">Ngày tạo bài viết (Không bắt buộc)</label>
                    <input type="date" name="created_at" id="created_at" class="form-control" value="{{ old('created_at', now()->format('Y-m-d')) }}">
                </div>

                <div class="form-group">
                    <label>Ảnh đại diện bài viết</label>
                    <div class="upload-zone" id="uploadZone">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                        </svg>
                        <p>Nhấn hoặc kéo thả ảnh vào đây</p>
                        <p class="hint">Hỗ trợ: JPG, PNG, WebP — Tối đa 5MB</p>
                        <input type="file" name="news_image" id="newsInput" accept="image/jpeg,image/png,image/webp" required>
                    </div>

                    <div class="preview-new" id="previewNew">
                        <img id="previewImg" src="" alt="Preview">
                    </div>
                </div>

                <div class="btn-group">
                    <a href="/admin/news" class="btn-cancel">Hủy bỏ</a>
                    <button type="submit" class="btn-submit" id="submitBtn">Đăng bài viết</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('newsInput');
    const preview = document.getElementById('previewNew');
    const previewImg = document.getElementById('previewImg');

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
        };
        reader.readAsDataURL(file);
    }
});
</script>
@endsection
