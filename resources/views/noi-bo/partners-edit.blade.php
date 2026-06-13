@extends('noi-bo.layout')

@section('title', 'Chỉnh sửa đối tác - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .partners-container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .partner-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .partner-card h2 {
        font-size: 20px;
        margin-bottom: 8px;
        color: #111827;
        font-weight: 750;
    }
    .partner-card .subtitle {
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
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 20px;
    }
    @media (max-width: 640px) {
        .form-row {
            grid-template-columns: 1fr;
            gap: 0;
        }
    }
    .current-image-wrapper {
        margin-bottom: 16px;
    }
    .current-image-wrapper img {
        height: 80px;
        max-width: 200px;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        padding: 6px;
        background: #fafafa;
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
        height: 80px;
        max-width: 200px;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        padding: 6px;
        background: #fafafa;
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
    <div class="partners-container">
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="partner-card">
            <h2>Chỉnh sửa đối tác - khách hàng</h2>
            <p class="subtitle font-sans">Thay đổi thông tin hoặc cập nhật logo đối tác: <strong>{{ $partner->name }}</strong>.</p>

            <form method="POST" action="/admin/partners/{{ $partner->id }}/edit" enctype="multipart/form-data" id="partnerForm">
                @csrf

                <div class="form-group">
                    <label for="name">Tên đối tác / khách hàng</label>
                    <input type="text" name="name" id="name" class="form-control" placeholder="Ví dụ: Bộ Khoa học và Công nghệ..." required value="{{ old('name', $partner->name) }}">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="group">Nhóm phân loại đối tác</label>
                        <select name="group" id="group" class="form-control" required>
                            <option value="gov" {{ old('group', $partner->group) == 'gov' ? 'selected' : '' }}>Cơ quan Bộ Ngành (gov)</option>
                            <option value="finance" {{ old('group', $partner->group) == 'finance' ? 'selected' : '' }}>Tài chính & Giáo dục (finance)</option>
                            <option value="media" {{ old('group', $partner->group) == 'media' ? 'selected' : '' }}>Truyền thông & Công nghệ (media)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="is_visible">Trạng thái hiển thị</label>
                        <select name="is_visible" id="is_visible" class="form-control">
                            <option value="1" {{ old('is_visible', $partner->is_visible) == '1' ? 'selected' : '' }}>Hiển thị ngay</option>
                            <option value="0" {{ old('is_visible', $partner->is_visible) == '0' ? 'selected' : '' }}>Ẩn logo đối tác</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Logo hiện tại</label>
                    <div class="current-image-wrapper">
                        <img src="{{ $partner->logo_path }}" alt="{{ $partner->name }}">
                    </div>

                    <label>Thay đổi logo mới (Không bắt buộc)</label>
                    <div class="upload-zone" id="uploadZone">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                        </svg>
                        <p>Nhấn hoặc kéo thả logo mới vào đây</p>
                        <p class="hint">Hỗ trợ: JPG, PNG, WebP — Tối đa 5MB</p>
                        <input type="file" name="partner_logo" id="partnerInput" accept="image/jpeg,image/png,image/webp">
                    </div>

                    <div class="preview-new" id="previewNew">
                        <img id="previewImg" src="" alt="Preview">
                    </div>
                </div>

                <div class="btn-group">
                    <a href="/admin/partners" class="btn-cancel">Hủy bỏ</a>
                    <button type="submit" class="btn-submit" id="submitBtn">Lưu thay đổi</button>
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
    const input = document.getElementById('partnerInput');
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
