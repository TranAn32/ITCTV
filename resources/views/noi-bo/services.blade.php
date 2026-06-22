@extends('noi-bo.layout')

@section('title', 'Quản lý Dịch vụ - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .services-container {
        max-width: 1100px;
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
    .service-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 16px;
    }
    .service-card h2 {
        font-size: 20px;
        color: #111827;
        font-weight: 750;
        margin: 0;
    }
    .service-card .subtitle {
        font-size: 13px;
        color: #6b7280;
    }
    .btn-create-service {
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
    .btn-create-service:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
    }
    .btn-create-service:active {
        transform: translateY(0);
    }
    .btn-create-service svg {
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

    /* Filter & Search Bar */
    .filter-bar {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
    }
    @media (min-width: 768px) {
        .filter-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
    .search-input-wrapper {
        position: relative;
        flex: 1;
        max-width: 400px;
    }
    .search-input-wrapper svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        color: #94a3b8;
    }
    .search-control {
        width: 100%;
        padding: 9px 12px 9px 36px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 13px;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }
    .search-control:focus {
        border-color: #2563EB;
        outline: none;
    }
    .theme-filters {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    .filter-btn {
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        background: #fff;
        font-size: 13px;
        font-weight: 600;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s;
    }
    .filter-btn.active {
        background: #2563EB;
        color: #fff;
        border-color: #2563EB;
    }
    .filter-btn:hover:not(.active) {
        background: #f1f5f9;
        border-color: #cbd5e1;
    }

    /* Table Styles */
    .service-table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #fff;
    }
    .service-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .service-table th {
        background: #f8fafc;
        padding: 14px 16px;
        font-size: 12px;
        font-weight: 700;
        color: #475569;
        border-bottom: 1px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .service-table td {
        padding: 16px;
        font-size: 14px;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
    }
    .service-table tr:hover {
        background: #fafbfc;
    }
    .service-icon-cell {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 8px;
        background: #eff6ff;
        color: #2563eb;
        font-weight: bold;
        border: 1px solid #dbeafe;
    }
    .service-title-cell {
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
        display: block;
        line-height: 1.4;
    }
    .service-meta-cell {
        font-size: 12px;
        color: #64748b;
    }
    
    /* Interactive Toggle Switch */
    .switch {
        position: relative;
        display: inline-block;
        width: 38px;
        height: 20px;
    }
    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cbd5e1;
        transition: .3s;
        border-radius: 34px;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
    }
    input:checked + .slider {
        background-color: #10B981;
    }
    input:focus + .slider {
        box-shadow: 0 0 1px #10B981;
    }
    input:checked + .slider:before {
        transform: translateX(18px);
    }
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
    }
    .status-text {
        font-size: 12px;
        font-weight: 550;
    }
    .status-text.visible { color: #10B981; }
    .status-text.hidden { color: #64748b; }

    /* Action Buttons */
    .actions-cell {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .btn-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
        background: #fff;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
    }
    .btn-action:hover {
        background: #f1f5f9;
        color: #0f172a;
        border-color: #cbd5e1;
    }
    .btn-action.delete:hover {
        background: #fee2e2;
        color: #ef4444;
        border-color: #fca5a5;
    }
    .btn-action svg {
        width: 16px;
        height: 16px;
    }

    /* Color badge */
    .color-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .color-blue { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .color-sky { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
    .color-emerald { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .color-indigo { background: #eef2ff; color: #3730a3; border: 1px solid #c7d2fe; }
    .color-rose { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }
    .color-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }

    /* Modal Styles */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
    }
    .modal-backdrop.active {
        display: flex;
    }
    .modal-content-card {
        background: #fff;
        border-radius: 16px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
    }
    .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal-header h3 {
        font-size: 16px;
        font-weight: 700;
        color: #0f172a;
    }
    .modal-close-btn {
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-close-btn:hover {
        background: #f1f5f9;
        color: #475569;
    }
    .modal-body {
        padding: 24px;
        overflow-y: auto;
    }
    .modal-service-title {
        font-size: 20px;
        font-weight: 750;
        color: #0f172a;
        margin-bottom: 16px;
        line-height: 1.4;
    }
    .modal-meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        margin-bottom: 20px;
        font-size: 13px;
    }
    .modal-meta-item strong {
        color: #475569;
        display: block;
        margin-bottom: 2px;
    }
    .modal-service-summary {
        font-size: 14px;
        color: #334155;
        line-height: 1.6;
        margin-bottom: 20px;
        border-left: 4px solid #2563eb;
        padding-left: 12px;
        font-weight: 500;
    }
    .modal-section-title {
        font-size: 13px;
        font-weight: 700;
        color: #2563eb;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
    }
    .modal-items-list {
        margin: 0;
        padding-left: 20px;
        color: #334155;
        font-size: 13.5px;
    }
    .modal-items-list li {
        margin-bottom: 8px;
        line-height: 1.5;
    }
    .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #f1f5f9;
        display: flex;
        justify-content: flex-end;
        background: #f8fafc;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .btn-secondary {
        padding: 9px 16px;
        background: #fff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        color: #475569;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }
    .btn-secondary:hover {
        background: #f1f5f9;
        color: #0f172a;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="services-container">
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

        <!-- Services Header -->
        <div class="service-card">
            <div class="service-card-header">
                <div>
                    <h2>Quản lý Dịch vụ cốt lõi</h2>
                    <p class="subtitle font-sans">Hiển thị, tìm kiếm và thay đổi danh mục dịch vụ cung cấp lên client.</p>
                </div>
                <a href="/admin/services/create" class="btn-create-service">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Thêm dịch vụ mới</span>
                </a>
            </div>

            <!-- Filter and Search -->
            <div class="filter-bar">
                <div class="search-input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="serviceSearchInput" class="search-control" placeholder="Tìm kiếm dịch vụ...">
                </div>

                <div class="theme-filters">
                    <button class="filter-btn active" data-color="all">Tất cả màu</button>
                    <button class="filter-btn" data-color="blue">Xanh dương (Blue)</button>
                    <button class="filter-btn" data-color="sky">Bầu trời (Sky)</button>
                    <button class="filter-btn" data-color="emerald">Ngọc lục bảo (Emerald)</button>
                    <button class="filter-btn" data-color="indigo">Chàm (Indigo)</button>
                    <button class="filter-btn" data-color="rose">Hồng (Rose)</button>
                    <button class="filter-btn" data-color="amber">Hổ phách (Amber)</button>
                </div>
            </div>

            <!-- Table list of services -->
            <div class="service-table-wrapper">
                <table class="service-table">
                    <thead>
                        <tr>
                            <th style="width: 70px; text-align: center;">Thứ tự</th>
                            <th style="width: 80px; text-align: center;">Icon</th>
                            <th>Dịch vụ</th>
                            <th style="width: 150px;">Phân loại / Tông màu</th>
                            <th style="width: 120px; text-align: center;">Trạng thái</th>
                            <th style="width: 130px; text-align: center;">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="serviceTableBody">
                        @forelse($servicesList as $item)
                            <tr class="service-row" 
                                data-title="{{ strtolower($item->title) }}" 
                                data-short-title="{{ strtolower($item->short_title) }}"
                                data-slug="{{ strtolower($item->slug) }}"
                                data-color="{{ $item->color_theme }}"
                                data-status="{{ $item->is_visible ? 'visible' : 'hidden' }}">
                                <td style="text-align: center; font-weight: bold; color: #64748b;">
                                    {{ $item->sort_order }}
                                </td>
                                <td style="text-align: center;">
                                    <span class="service-icon-cell font-sans" title="Icon: {{ $item->icon }}">
                                        {{ substr($item->icon, 0, 3) }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        @if($item->image_path)
                                            <img src="{{ $item->image_path }}" alt="Service Image" style="width: 48px; height: 36px; border-radius: 4px; object-fit: cover; border: 1px solid #e2e8f0; flex-shrink: 0;">
                                        @else
                                            <div style="width: 48px; height: 36px; border-radius: 4px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; border: 1px dashed #cbd5e1; font-size: 10px; color: #94a3b8; flex-shrink: 0;" title="Chưa có ảnh">No Image</div>
                                        @endif
                                        <div>
                                            <span class="service-title-cell">{{ $item->title }}</span>
                                            <div class="service-meta-cell font-sans">
                                                <span><strong>Slug:</strong> {{ $item->slug }}</span>
                                                <span style="margin-left: 10px;"><strong>Tên ngắn:</strong> {{ $item->short_title }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">{{ $item->tag }}</span>
                                    <span class="color-badge color-{{ $item->color_theme }} font-sans">{{ $item->color_theme }}</span>
                                </td>
                                <td style="text-align: center;">
                                    <div class="status-badge" style="justify-content: center;">
                                        <label class="switch">
                                            <input type="checkbox" class="status-toggle-checkbox" data-id="{{ $item->id }}" {{ $item->is_visible ? 'checked' : '' }}>
                                            <span class="slider"></span>
                                        </label>
                                        <span class="status-text {{ $item->is_visible ? 'visible' : 'hidden' }}" id="status-text-{{ $item->id }}">
                                            {{ $item->is_visible ? 'Hiện' : 'Ẩn' }}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="actions-cell" style="justify-content: center;">
                                        <!-- View Detail Button -->
                                        <button type="button" class="btn-action view-btn" 
                                                data-title="{{ $item->title }}"
                                                data-short-title="{{ $item->short_title }}"
                                                data-slug="{{ $item->slug }}"
                                                data-tag="{{ $item->tag }}"
                                                data-icon="{{ $item->icon }}"
                                                data-color="{{ $item->color_theme }}"
                                                data-summary="{{ $item->summary }}"
                                                data-items="{{ $item->items }}"
                                                data-image="{{ $item->image_path }}"
                                                title="Xem chi tiết">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>

                                        <!-- Edit Button -->
                                        <a href="/admin/services/{{ $item->id }}/edit" class="btn-action" title="Chỉnh sửa">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </a>

                                        <!-- Delete Form -->
                                        <form method="POST" action="/admin/services/delete" onsubmit="return confirm('Bạn có chắc chắn muốn xóa dịch vụ này? Hành động này không thể hoàn tác.');" style="margin: 0;">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $item->id }}">
                                            <button type="submit" class="btn-action delete" title="Xóa">
                                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr id="emptyRow">
                                <td colspan="6" style="text-align: center; color: #64748b; padding: 30px;">
                                    Chưa có dịch vụ nào được tạo.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal Popup Detail Service -->
<div class="modal-backdrop" id="serviceDetailModal">
    <div class="modal-content-card">
        <div class="modal-header">
            <h3>Chi tiết Dịch vụ</h3>
            <button type="button" class="modal-close-btn" id="closeModalBtn">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <h2 class="modal-service-title" id="modalTitle"></h2>
            
            <div class="modal-meta-grid font-sans">
                <div class="modal-meta-item">
                    <strong>Định danh (Slug):</strong>
                    <span id="modalSlug"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Tên ngắn (Tab):</strong>
                    <span id="modalShortTitle"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Icon / Tông màu:</strong>
                    <span id="modalTheme"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Nhãn phân loại (Tag):</strong>
                    <span id="modalTag"></span>
                </div>
            </div>

            <div id="modalImageContainer" style="margin-bottom: 20px; display: none;">
                <img id="modalImage" src="" alt="Service Image" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
            </div>

            <div class="modal-service-summary font-sans" id="modalSummary"></div>
            
            <div class="modal-section-title">Nội dung chi tiết (items):</div>
            <ul class="modal-items-list" id="modalItems"></ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-secondary" id="closeModalBtn2">Đóng lại</button>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 1. Instant Search & Theme Color Filtering
    const searchInput = document.getElementById('serviceSearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.service-row');
    const emptyRow = document.getElementById('emptyRow');

    let currentColor = 'all';
    let currentSearch = '';

    function applyFilters() {
        let visibleCount = 0;
        rows.forEach(row => {
            const title = row.getAttribute('data-title');
            const shortTitle = row.getAttribute('data-short-title');
            const slug = row.getAttribute('data-slug');
            const color = row.getAttribute('data-color');

            const searchLower = currentSearch.toLowerCase();
            const matchesSearch = title.includes(searchLower) || shortTitle.includes(searchLower) || slug.includes(searchLower);
            const matchesColor = currentColor === 'all' || color === currentColor;

            if (matchesSearch && matchesColor) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Toggle Empty state Row
        if (rows.length > 0) {
            if (visibleCount === 0) {
                if (!document.getElementById('tempEmptyRow')) {
                    const tr = document.createElement('tr');
                    tr.id = 'tempEmptyRow';
                    tr.innerHTML = `<td colspan="6" style="text-align: center; color: #64748b; padding: 30px;">Không tìm thấy kết quả phù hợp.</td>`;
                    document.getElementById('serviceTableBody').appendChild(tr);
                }
                if (emptyRow) emptyRow.style.display = 'none';
            } else {
                const tempRow = document.getElementById('tempEmptyRow');
                if (tempRow) tempRow.remove();
                if (emptyRow) emptyRow.style.display = 'none';
            }
        }
    }

    searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        applyFilters();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentColor = this.getAttribute('data-color');
            applyFilters();
        });
    });

    // 2. AJAX status Toggle
    const checkboxes = document.querySelectorAll('.status-toggle-checkbox');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const serviceId = this.getAttribute('data-id');
            const statusText = document.getElementById(`status-text-${serviceId}`);
            
            statusText.innerText = '...';
            statusText.className = 'status-text';

            fetch('/admin/services/toggle-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ id: serviceId })
            })
            .then(res => {
                if (!res.ok) throw new Error('Thất bại');
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    const isVisible = data.is_visible;
                    statusText.innerText = isVisible ? 'Hiện' : 'Ẩn';
                    statusText.className = 'status-text ' + (isVisible ? 'visible' : 'hidden');
                    
                    const row = chk.closest('.service-row');
                    if (row) {
                        row.setAttribute('data-status', isVisible ? 'visible' : 'hidden');
                    }
                    applyFilters();
                } else {
                    alert('Lỗi: ' + (data.message || 'Không thể cập nhật'));
                    this.checked = !this.checked;
                    statusText.innerText = this.checked ? 'Hiện' : 'Ẩn';
                    statusText.className = 'status-text ' + (this.checked ? 'visible' : 'hidden');
                }
            })
            .catch(err => {
                alert('Lỗi kết nối máy chủ.');
                this.checked = !this.checked;
                statusText.innerText = this.checked ? 'Hiện' : 'Ẩn';
                statusText.className = 'status-text ' + (this.checked ? 'visible' : 'hidden');
            });
        });
    });

    // 3. Detail View Modal
    const modal = document.getElementById('serviceDetailModal');
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const shortTitle = this.getAttribute('data-short-title');
            const slug = this.getAttribute('data-slug');
            const tag = this.getAttribute('data-tag');
            const icon = this.getAttribute('data-icon');
            const color = this.getAttribute('data-color');
            const summary = this.getAttribute('data-summary');
            const itemsText = this.getAttribute('data-items');
            const image = this.getAttribute('data-image');

            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalSlug').innerText = slug;
            document.getElementById('modalShortTitle').innerText = shortTitle;
            document.getElementById('modalTheme').innerText = `${icon} / Tông màu ${color}`;
            document.getElementById('modalTag').innerText = tag;
            document.getElementById('modalSummary').innerText = summary;

            // Handle image display
            const imgContainer = document.getElementById('modalImageContainer');
            const imgEl = document.getElementById('modalImage');
            if (image) {
                imgEl.src = image;
                imgContainer.style.display = 'block';
            } else {
                imgContainer.style.display = 'none';
                imgEl.src = '';
            }

            // Render items list
            const listContainer = document.getElementById('modalItems');
            listContainer.innerHTML = '';
            
            if (itemsText) {
                const lines = itemsText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                lines.forEach(line => {
                    const li = document.createElement('li');
                    li.innerText = line;
                    listContainer.appendChild(li);
                });
            } else {
                listContainer.innerHTML = '<li>Chưa có hạng mục công việc chi tiết.</li>';
            }

            modal.classList.add('active');
        });
    });

    // Close Modal logic
    const closeBtns = [document.getElementById('closeModalBtn'), document.getElementById('closeModalBtn2')];
    closeBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    });

    // Click outside to close modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
</script>
@endsection
