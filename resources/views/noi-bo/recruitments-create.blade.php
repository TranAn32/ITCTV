@extends('noi-bo.layout')

@section('title', 'Đăng tin tuyển dụng - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .recruit-container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .recruit-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .recruit-card h2 {
        font-size: 20px;
        margin-bottom: 8px;
        color: #111827;
        font-weight: 750;
    }
    .recruit-card .subtitle {
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
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .form-hint {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 4px;
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
    .section-divider {
        border: none;
        border-top: 1px solid #f1f5f9;
        margin: 24px 0;
    }
    .section-title {
        font-size: 14px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .section-title svg {
        width: 16px;
        height: 16px;
        color: #2563EB;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="recruit-container">
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="recruit-card">
            <h2>Đăng tin tuyển dụng mới</h2>
            <p class="subtitle">Nhập đầy đủ thông tin bên dưới để tạo tin tuyển dụng mới.</p>

            <form method="POST" action="/admin/recruitments" id="recruitForm">
                @csrf

                <div class="section-title">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Thông tin cơ bản
                </div>

                <div class="form-group">
                    <label for="title">Tên vị trí tuyển dụng *</label>
                    <input type="text" name="title" id="title" class="form-control" placeholder="VD: Kỹ sư Tư vấn CNTT..." required value="{{ old('title') }}">
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="department">Phòng ban</label>
                        <input type="text" name="department" id="department" class="form-control" placeholder="VD: Phòng Kỹ thuật" value="{{ old('department') }}">
                    </div>
                    <div class="form-group">
                        <label for="location">Địa điểm làm việc</label>
                        <input type="text" name="location" id="location" class="form-control" placeholder="VD: Hà Nội" value="{{ old('location') }}">
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="employment_type">Loại hình công việc *</label>
                        <select name="employment_type" id="employment_type" class="form-control">
                            <option value="Toàn thời gian" {{ old('employment_type') == 'Toàn thời gian' ? 'selected' : '' }}>Toàn thời gian</option>
                            <option value="Bán thời gian" {{ old('employment_type') == 'Bán thời gian' ? 'selected' : '' }}>Bán thời gian</option>
                            <option value="Remote" {{ old('employment_type') == 'Remote' ? 'selected' : '' }}>Remote</option>
                            <option value="Thực tập" {{ old('employment_type') == 'Thực tập' ? 'selected' : '' }}>Thực tập</option>
                            <option value="Freelance" {{ old('employment_type') == 'Freelance' ? 'selected' : '' }}>Freelance</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="experience">Yêu cầu kinh nghiệm</label>
                        <input type="text" name="experience" id="experience" class="form-control" placeholder="VD: 2-3 năm kinh nghiệm" value="{{ old('experience') }}">
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="salary_range">Khoảng lương</label>
                        <input type="text" name="salary_range" id="salary_range" class="form-control" placeholder="VD: 15 - 25 triệu" value="{{ old('salary_range') }}">
                        <p class="form-hint">Để trống nếu thỏa thuận</p>
                    </div>
                    <div class="form-group">
                        <label for="deadline">Hạn nộp hồ sơ</label>
                        <input type="date" name="deadline" id="deadline" class="form-control" value="{{ old('deadline') }}">
                    </div>
                </div>

                <hr class="section-divider">

                <div class="section-title">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Nội dung chi tiết
                </div>

                <div class="form-group">
                    <label for="description">Mô tả công việc *</label>
                    <textarea name="description" id="description" class="form-control" placeholder="Mô tả chi tiết công việc, trách nhiệm chính..." required style="min-height: 160px">{{ old('description') }}</textarea>
                </div>

                <div class="form-group">
                    <label for="requirements">Yêu cầu ứng viên</label>
                    <textarea name="requirements" id="requirements" class="form-control" placeholder="Liệt kê các yêu cầu về trình độ, kỹ năng...">{{ old('requirements') }}</textarea>
                </div>

                <div class="form-group">
                    <label for="benefits">Quyền lợi</label>
                    <textarea name="benefits" id="benefits" class="form-control" placeholder="Các chế độ đãi ngộ, quyền lợi...">{{ old('benefits') }}</textarea>
                </div>

                <hr class="section-divider">

                <div class="form-group">
                    <label for="is_visible">Trạng thái hiển thị</label>
                    <select name="is_visible" id="is_visible" class="form-control">
                        <option value="1" {{ old('is_visible', '1') == '1' ? 'selected' : '' }}>Hiển thị ngay</option>
                        <option value="0" {{ old('is_visible') == '0' ? 'selected' : '' }}>Ẩn tin tuyển dụng</option>
                    </select>
                </div>

                <div class="btn-group">
                    <a href="/admin/recruitments" class="btn-cancel">Hủy bỏ</a>
                    <button type="submit" class="btn-submit">Đăng tin tuyển dụng</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
