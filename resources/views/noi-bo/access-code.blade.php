@extends('noi-bo.layout')

@section('title', 'Quản lý Mã Truy Cập - Cổng Nội Bộ')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .form-container {
        max-width: 500px;
        margin: 60px auto;
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .form-container h2 {
        font-size: 20px;
        margin-bottom: 24px;
        color: #111827;
        text-align: center;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .form-group label {
        display: block;
        font-size: 14px;
        font-weight: 500;
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
        transition: border-color 0.2s;
    }
    .form-group input:focus {
        border-color: #2563EB;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="form-container">
        <h2>Thay đổi Mã Truy Cập</h2>

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

        <form method="POST" action="/admin/access-code">
            @csrf
            <div class="form-group">
                <label for="current_code">Mã truy cập hiện tại</label>
                <input type="password" id="current_code" name="current_code" required>
            </div>
            
            <div class="form-group">
                <label for="new_code">Mã truy cập mới</label>
                <input type="password" id="new_code" name="new_code" required>
            </div>
            
            <div class="form-group">
                <label for="new_code_confirmation">Xác nhận mã truy cập mới</label>
                <input type="password" id="new_code_confirmation" name="new_code_confirmation" required>
            </div>

            <button type="submit" class="btn-submit">Cập nhật mã</button>
        </form>
    </div>
</div>
@endsection
