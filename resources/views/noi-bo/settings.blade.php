@extends('noi-bo.layout')

@section('title', 'Cài đặt chung - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .settings-container {
        max-width: 650px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .settings-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .settings-card h2 {
        font-size: 18px;
        margin-bottom: 8px;
        color: #111827;
        font-weight: 750;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .settings-card h2 svg {
        width: 20px;
        height: 20px;
        color: #2563EB;
    }
    .settings-card .subtitle {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 24px;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .form-group label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
    }
    .form-group input {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }
    .form-group input:focus {
        border-color: #2563EB;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    .btn-submit {
        width: 100%;
        padding: 11px;
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
        background: #1E3A8A;
    }
    .alert {
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        margin-bottom: 20px;
    }
    .alert-success {
        background: #eff6ff;
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
    .section-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 24px 0;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="settings-container">
        
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

        <!-- Form cài đặt chung -->
        <div class="settings-card">
            <form method="POST" action="/admin/settings">
                @csrf
                
                <!-- 1. Cài đặt Email nhận yêu cầu -->
                <h2>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>Email Nhận Yêu Cầu Tư Vấn</span>
                </h2>
                <p class="subtitle">Email này sẽ nhận các thông tin đăng ký tư vấn trực tiếp từ biểu mẫu liên hệ ngoài trang chủ.</p>
                
                <div class="form-group">
                    <label for="recipient_email">Địa chỉ thư điện tử nhận tin</label>
                    <input type="email" id="recipient_email" name="recipient_email" required value="{{ old('recipient_email', $recipientEmail) }}" placeholder="example@itctv.vn">
                </div>

                <div class="section-divider"></div>

                <!-- 2. Đổi mã đăng nhập Portal -->
                <h2>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                    </svg>
                    <span>Thay Đổi Mã Đăng Nhập Admin</span>
                </h2>
                <p class="subtitle">Để trống nếu không có nhu cầu đổi mã đăng nhập (mã truy cập portal).</p>

                <div class="form-group">
                    <label for="current_code">Mã truy cập hiện tại</label>
                    <input type="password" id="current_code" name="current_code" placeholder="••••••••">
                </div>
                
                <div class="form-group">
                    <label for="new_code">Mã truy cập mới</label>
                    <input type="password" id="new_code" name="new_code" placeholder="Tối thiểu 4 ký tự">
                </div>
                
                <div class="form-group">
                    <label for="new_code_confirmation">Xác nhận mã truy cập mới</label>
                    <input type="password" id="new_code_confirmation" name="new_code_confirmation" placeholder="Xác nhận lại mã mới">
                </div>

                <button type="submit" class="btn-submit">Lưu Cài Đặt</button>
            </form>
        </div>
        
    </div>
</div>
@endsection
