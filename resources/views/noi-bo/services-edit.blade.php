@extends('noi-bo.layout')

@section('title', 'Chỉnh sửa dịch vụ - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .services-container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .service-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .service-card h2 {
        font-size: 20px;
        margin-bottom: 8px;
        color: #111827;
        font-weight: 750;
    }
    .service-card .subtitle {
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
        min-height: 100px;
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
    <div class="services-container">
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="service-card">
            <h2>Chỉnh sửa dịch vụ</h2>
            <p class="subtitle font-sans">Thay đổi thông tin dịch vụ cốt lõi bên dưới và nhấn lưu để cập nhật.</p>

            <form method="POST" action="/admin/services/{{ $service->id }}/edit" id="serviceForm" enctype="multipart/form-data">
                @csrf

                <div class="form-group">
                    <label for="title">Tên dịch vụ đầy đủ</label>
                    <input type="text" name="title" id="title" class="form-control" placeholder="Ví dụ: Tư vấn khảo sát dự án Công nghệ thông tin..." required value="{{ old('title', $service->title) }}">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="short_title">Tên dịch vụ ngắn (Hiển thị ở Tab trái)</label>
                        <input type="text" name="short_title" id="short_title" class="form-control" placeholder="Ví dụ: Tư vấn khảo sát..." required value="{{ old('short_title', $service->short_title) }}">
                    </div>

                    <div class="form-group">
                        <label for="slug">Định danh URL (Slug - duy nhất)</label>
                        <input type="text" name="slug" id="slug" class="form-control" placeholder="Ví dụ: khao-sat-cntt..." required value="{{ old('slug', $service->slug) }}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="tag">Nhãn phân loại (Tag)</label>
                        <input type="text" name="tag" id="tag" class="form-control" placeholder="Ví dụ: Chuẩn bị đầu tư..." required value="{{ old('tag', $service->tag) }}">
                    </div>

                    <div class="form-group">
                        <label for="color_theme">Tông màu hiển thị (Color Theme)</label>
                        <select name="color_theme" id="color_theme" class="form-control" required>
                            <option value="blue" {{ old('color_theme', $service->color_theme) == 'blue' ? 'selected' : '' }}>Xanh dương (Blue)</option>
                            <option value="sky" {{ old('color_theme', $service->color_theme) == 'sky' ? 'selected' : '' }}>Bầu trời (Sky)</option>
                            <option value="emerald" {{ old('color_theme', $service->color_theme) == 'emerald' ? 'selected' : '' }}>Ngọc lục bảo (Emerald)</option>
                            <option value="indigo" {{ old('color_theme', $service->color_theme) == 'indigo' ? 'selected' : '' }}>Chàm (Indigo)</option>
                            <option value="rose" {{ old('color_theme', $service->color_theme) == 'rose' ? 'selected' : '' }}>Hồng (Rose)</option>
                            <option value="amber" {{ old('color_theme', $service->color_theme) == 'amber' ? 'selected' : '' }}>Hổ phách (Amber)</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="icon">Icon hiển thị (Lucide Icon)</label>
                        <select name="icon" id="icon" class="form-control" required>
                            <option value="Search" {{ old('icon', $service->icon) == 'Search' ? 'selected' : '' }}>Search (Kính lúp)</option>
                            <option value="Layers" {{ old('icon', $service->icon) == 'Layers' ? 'selected' : '' }}>Layers (Lớp xếp)</option>
                            <option value="Calculator" {{ old('icon', $service->icon) == 'Calculator' ? 'selected' : '' }}>Calculator (Máy tính)</option>
                            <option value="ClipboardList" {{ old('icon', $service->icon) == 'ClipboardList' ? 'selected' : '' }}>ClipboardList (Danh sách)</option>
                            <option value="ShieldCheck" {{ old('icon', $service->icon) == 'ShieldCheck' ? 'selected' : '' }}>ShieldCheck (Khiên bảo vệ)</option>
                            <option value="Eye" {{ old('icon', $service->icon) == 'Eye' ? 'selected' : '' }}>Eye (Con mắt)</option>
                            <option value="Briefcase" {{ old('icon', $service->icon) == 'Briefcase' ? 'selected' : '' }}>Briefcase (Cặp tài liệu)</option>
                            <option value="Settings" {{ old('icon', $service->icon) == 'Settings' ? 'selected' : '' }}>Settings (Bánh răng)</option>
                            <option value="Database" {{ old('icon', $service->icon) == 'Database' ? 'selected' : '' }}>Database (Cơ sở dữ liệu)</option>
                            <option value="Cpu" {{ old('icon', $service->icon) == 'Cpu' ? 'selected' : '' }}>Cpu (Bộ vi xử lý)</option>
                            <option value="Globe" {{ old('icon', $service->icon) == 'Globe' ? 'selected' : '' }}>Globe (Địa cầu)</option>
                            <option value="FileText" {{ old('icon', $service->icon) == 'FileText' ? 'selected' : '' }}>FileText (Văn bản)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="sort_order">Thứ tự hiển thị (Tăng dần)</label>
                        <input type="number" name="sort_order" id="sort_order" class="form-control" placeholder="1, 2, 3..." required value="{{ old('sort_order', $service->sort_order) }}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="is_visible">Trạng thái hiển thị</label>
                        <select name="is_visible" id="is_visible" class="form-control">
                            <option value="1" {{ old('is_visible', $service->is_visible) == '1' ? 'selected' : '' }}>Hiện dịch vụ</option>
                            <option value="0" {{ old('is_visible', $service->is_visible) == '0' ? 'selected' : '' }}>Ẩn dịch vụ</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="service_image">Ảnh đại diện dịch vụ (Tải lên để thay đổi)</label>
                        @if(!empty($service->image_path))
                            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 16px;">
                                <img src="{{ $service->image_path }}" alt="Current Image" style="max-width: 120px; max-height: 80px; border-radius: 8px; border: 1px solid #cbd5e1; object-fit: cover;">
                                <label style="font-weight: normal; font-size: 13px; color: #ef4444; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; margin-bottom: 0;">
                                    <input type="checkbox" name="delete_image" value="1" style="cursor: pointer;"> Xóa ảnh hiện tại
                                </label>
                            </div>
                        @endif
                        <input type="file" name="service_image" id="service_image" class="form-control" accept="image/*">
                    </div>
                </div>

                <div class="form-group">
                    <label for="summary">Tóm tắt dịch vụ (Hộp nổi bật)</label>
                    <textarea name="summary" id="summary" class="form-control" style="min-height: 80px" placeholder="Ví dụ: Khảo sát và đánh giá thực tế một cách độc lập, chi tiết..." required>{{ old('summary', $service->summary) }}</textarea>
                </div>

                <div class="form-group">
                    <label for="items">Nội dung phụng sự chi tiết (Nhập mỗi dòng một ý)</label>
                    <textarea name="items" id="items" class="form-control" style="min-height: 150px" placeholder="Ví dụ:&#10;Khảo sát đánh giá hiện trạng và các kế hoạch ứng dụng CNTT&#10;Khảo sát số liệu hiện trạng hồ sơ của Đơn vị phục vụ cho lập dự án&#10;Xây dựng Báo cáo kết quả khảo sát bảo đảm khoa học" required>{{ old('items', $service->items) }}</textarea>
                </div>

                <div class="btn-group">
                    <a href="/admin/services" class="btn-cancel">Hủy bỏ</a>
                    <button type="submit" class="btn-submit">Cập nhật dịch vụ</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Tự động tạo slug từ tên dịch vụ nếu muốn (tùy chọn)
    const titleInput = document.getElementById('title');
    const slugInput = document.getElementById('slug');

    titleInput.addEventListener('blur', function() {
        if (!slugInput.value) {
            slugInput.value = generateSlug(this.value);
        }
    });

    function generateSlug(str) {
        str = str.toLowerCase();
        str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
        str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
        str = str.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
        str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
        str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
        str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/[^a-z0-9 -]/g, '');
        str = str.replace(/\s+/g, '-');
        str = str.replace(/-+/g, '-');
        return str;
    }
});
</script>
@endsection
