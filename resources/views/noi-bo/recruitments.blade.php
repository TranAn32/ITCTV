@extends('noi-bo.layout')

@section('title', 'Quản lý Tuyển dụng - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .recruit-container {
        max-width: 1100px;
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
    .recruit-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-b: 1px solid #f1f5f9;
        padding-bottom: 16px;
    }
    .recruit-card h2 {
        font-size: 20px;
        color: #111827;
        font-weight: 750;
        margin: 0;
    }
    .recruit-card .subtitle {
        font-size: 13px;
        color: #6b7280;
    }
    .btn-create {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        background: #2563EB;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s, transform 0.1s;
    }
    .btn-create:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
    }
    .btn-create svg {
        width: 16px;
        height: 16px;
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
    .recruit-table-wrapper {
        overflow-x: auto;
        margin-top: 16px;
    }
    .recruit-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 13px;
    }
    .recruit-table thead th {
        background: #f8fafc;
        color: #475569;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
        white-space: nowrap;
    }
    .recruit-table tbody td {
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
        color: #334155;
        vertical-align: middle;
    }
    .recruit-table tbody tr:hover {
        background: #f8fafc;
    }
    .recruit-title {
        font-weight: 700;
        color: #0f172a;
        font-size: 14px;
        max-width: 260px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .recruit-dept {
        font-size: 12px;
        color: #64748b;
        margin-top: 2px;
    }
    .badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
    }
    .badge-visible {
        background: #dcfce7;
        color: #166534;
    }
    .badge-hidden {
        background: #f1f5f9;
        color: #64748b;
    }
    .badge-type {
        background: #dbeafe;
        color: #1e40af;
    }
    .badge-deadline {
        background: #fef3c7;
        color: #92400e;
        font-size: 11px;
    }
    .badge-expired {
        background: #fee2e2;
        color: #991b1b;
        font-size: 11px;
    }
    .action-btns {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .btn-action {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        border: 1px solid #e2e8f0;
        background: #fff;
        color: #475569;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.15s;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }
    .btn-action:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
    }
    .btn-action.danger:hover {
        background: #fef2f2;
        color: #dc2626;
        border-color: #fecaca;
    }
    .btn-toggle {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: all 0.15s;
    }
    .btn-toggle-on {
        background: #dcfce7;
        color: #166534;
    }
    .btn-toggle-off {
        background: #f1f5f9;
        color: #64748b;
    }
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 24px;
    }
    .stat-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px 20px;
        text-align: center;
    }
    .stat-box .stat-number {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
    }
    .stat-box .stat-label {
        font-size: 12px;
        color: #64748b;
        font-weight: 600;
        margin-top: 4px;
    }
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #94a3b8;
    }
    .empty-state svg {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
        color: #cbd5e1;
    }
    .empty-state h3 {
        font-size: 16px;
        font-weight: 700;
        color: #475569;
        margin-bottom: 4px;
    }
    .empty-state p {
        font-size: 13px;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="recruit-container">

        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if($errors->any())
            <div class="alert alert-danger">
                @foreach($errors->all() as $error)
                    <span>{{ $error }}</span>
                @endforeach
            </div>
        @endif

        <div class="recruit-card">
            <div class="recruit-card-header">
                <div>
                    <h2>Quản lý Tuyển dụng</h2>
                    <p class="subtitle">Đăng và quản lý các vị trí tuyển dụng của công ty.</p>
                </div>
                <a href="/admin/recruitments/create" class="btn-create">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                    Đăng tin tuyển dụng
                </a>
            </div>

            @php
                $totalCount = $recruitments->count();
                $visibleCount = $recruitments->where('is_visible', true)->count();
                $activeDeadlineCount = $recruitments->where('deadline', '>=', now()->format('Y-m-d'))->count();
            @endphp

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-number">{{ $totalCount }}</div>
                    <div class="stat-label">Tổng tin tuyển dụng</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">{{ $visibleCount }}</div>
                    <div class="stat-label">Đang hiển thị</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">{{ $activeDeadlineCount }}</div>
                    <div class="stat-label">Còn hạn nộp</div>
                </div>
            </div>

            @if($totalCount > 0)
                <div class="recruit-table-wrapper">
                    <table class="recruit-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vị trí tuyển dụng</th>
                                <th>Loại hình</th>
                                <th>Địa điểm</th>
                                <th>Hạn nộp</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($recruitments as $index => $item)
                            <tr id="recruit-row-{{ $item->id }}">
                                <td style="color:#94a3b8; font-weight:700">{{ $index + 1 }}</td>
                                <td>
                                    <div class="recruit-title">{{ $item->title }}</div>
                                    @if($item->department)
                                        <div class="recruit-dept">{{ $item->department }}</div>
                                    @endif
                                </td>
                                <td><span class="badge badge-type">{{ $item->employment_type }}</span></td>
                                <td style="font-size:12px; color:#475569">{{ $item->location ?? '—' }}</td>
                                <td>
                                    @if($item->deadline)
                                        @if(\Carbon\Carbon::parse($item->deadline)->isPast())
                                            <span class="badge badge-expired">Hết hạn {{ \Carbon\Carbon::parse($item->deadline)->format('d/m/Y') }}</span>
                                        @else
                                            <span class="badge badge-deadline">{{ \Carbon\Carbon::parse($item->deadline)->format('d/m/Y') }}</span>
                                        @endif
                                    @else
                                        <span style="color:#94a3b8">—</span>
                                    @endif
                                </td>
                                <td>
                                    <button
                                        class="btn-toggle {{ $item->is_visible ? 'btn-toggle-on' : 'btn-toggle-off' }}"
                                        onclick="toggleRecruitment({{ $item->id }}, this)"
                                        id="toggle-btn-{{ $item->id }}"
                                    >
                                        {{ $item->is_visible ? '✓ Hiển thị' : '✗ Đã ẩn' }}
                                    </button>
                                </td>
                                <td>
                                    <div class="action-btns">
                                        <a href="/admin/recruitments/{{ $item->id }}/edit" class="btn-action">
                                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                            Sửa
                                        </a>
                                        <form method="POST" action="/admin/recruitments/delete" style="margin:0" onsubmit="return confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $item->id }}">
                                            <button type="submit" class="btn-action danger">
                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                Xóa
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @else
                <div class="empty-state">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                    <h3>Chưa có tin tuyển dụng nào</h3>
                    <p>Nhấn "Đăng tin tuyển dụng" để bắt đầu.</p>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
function toggleRecruitment(id, btn) {
    fetch('/admin/recruitments/toggle-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify({ id: id })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            if (data.is_visible) {
                btn.className = 'btn-toggle btn-toggle-on';
                btn.textContent = '✓ Hiển thị';
            } else {
                btn.className = 'btn-toggle btn-toggle-off';
                btn.textContent = '✗ Đã ẩn';
            }
        }
    })
    .catch(err => console.error('Toggle error:', err));
}
</script>
@endsection
