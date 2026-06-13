@extends('noi-bo.layout')

@section('title', 'Quản lý Dự án - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .projects-container {
        max-width: 1100px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .project-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .project-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 16px;
    }
    .project-card h2 {
        font-size: 20px;
        color: #111827;
        font-weight: 750;
        margin: 0;
    }
    .project-card .subtitle {
        font-size: 13px;
        color: #6b7280;
    }
    .btn-create-project {
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
    .btn-create-project:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
    }
    .btn-create-project:active {
        transform: translateY(0);
    }
    .btn-create-project svg {
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
    .status-filters {
        display: flex;
        gap: 8px;
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
    .project-table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #fff;
    }
    .project-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .project-table th {
        background: #f8fafc;
        padding: 14px 16px;
        font-size: 12px;
        font-weight: 700;
        color: #475569;
        border-bottom: 1px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .project-table td {
        padding: 16px;
        font-size: 14px;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
    }
    .project-table tr:hover {
        background: #fafbfc;
    }
    .project-thumb {
        width: 80px;
        height: 52px;
        object-fit: cover;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
    }
    .project-title-cell {
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
        display: block;
        line-height: 1.4;
    }
    .project-info-cell {
        font-size: 12px;
        color: #64748b;
    }
    .project-info-cell span {
        margin-right: 12px;
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

    /* Modal Styles */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.6);
        z-index: 1050;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        backdrop-filter: blur(4px);
    }
    .modal-content-card {
        background: #fff;
        border-radius: 16px;
        width: 100%;
        max-width: 650px;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        display: flex;
        flex-direction: column;
        animation: modalScaleUp 0.2s ease-out;
    }
    @keyframes modalScaleUp {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal-header h3 {
        font-size: 16px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
    }
    .modal-close-btn {
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
    }
    .modal-close-btn:hover {
        background: #f1f5f9;
        color: #475569;
    }
    .modal-body {
        padding: 24px;
        overflow-y: auto;
    }
    .modal-project-img {
        width: 100%;
        max-height: 280px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #e2e8f0;
    }
    .modal-project-title {
        font-size: 20px;
        font-weight: 850;
        color: #0f172a;
        line-height: 1.4;
        margin-bottom: 12px;
    }
    .modal-meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        margin-bottom: 20px;
        font-size: 13px;
    }
    .modal-meta-item strong {
        color: #0f172a;
    }
    .modal-meta-item span {
        color: #475569;
        display: block;
        margin-top: 2px;
    }
    .modal-project-scope {
        font-weight: 600;
        font-size: 13px;
        color: #475569;
        background: #eff6ff;
        border-left: 4px solid #2563EB;
        padding: 12px 16px;
        border-radius: 0 8px 8px 0;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    .modal-project-details-title {
        font-size: 14px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 8px;
    }
    .modal-project-details {
        font-size: 13.5px;
        color: #334155;
        line-height: 1.7;
        margin: 0;
        padding-left: 20px;
    }
    .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #e2e8f0;
        text-align: right;
    }
    .btn-secondary {
        padding: 8px 16px;
        background: #fff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        color: #475569;
        cursor: pointer;
    }
    .btn-secondary:hover {
        background: #f8fafc;
        border-color: #94a3b8;
    }
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="projects-container">
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

        <!-- Dự án Header và Nút Tạo mới -->
        <div class="project-card">
            <div class="project-card-header">
                <div>
                    <h2>Quản lý Dự án</h2>
                    <p class="subtitle font-sans">Hiển thị, tìm kiếm và thay đổi trạng thái đăng các dự án tiêu biểu.</p>
                </div>
                <a href="/admin/projects/create" class="btn-create-project">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Thêm dự án mới</span>
                </a>
            </div>

            <!-- Bộ lọc và Tìm kiếm -->
            <div class="filter-bar">
                <div class="search-input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="projectSearchInput" class="search-control" placeholder="Tìm kiếm theo tiêu đề hoặc chủ đầu tư...">
                </div>

                <div class="status-filters">
                    <button class="filter-btn active" data-status="all">Tất cả</button>
                    <button class="filter-btn" data-status="visible">Đang hiển thị</button>
                    <button class="filter-btn" data-status="hidden">Đang ẩn</button>
                </div>
            </div>

            <!-- Bảng Dự án -->
            <div class="project-table-wrapper">
                <table class="project-table">
                    <thead>
                        <tr>
                            <th style="width: 100px;">Ảnh</th>
                            <th>Dự án</th>
                            <th style="width: 180px;">Giá trị thực hiện</th>
                            <th style="width: 130px; text-align: center;">Trạng thái</th>
                            <th style="width: 130px; text-align: center;">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="projectTableBody">
                        @forelse($projectsList as $item)
                            <tr class="project-row" 
                                data-title="{{ strtolower($item->title) }}" 
                                data-client="{{ strtolower($item->client) }}"
                                data-status="{{ $item->is_visible ? 'visible' : 'hidden' }}">
                                <td>
                                    <img src="{{ $item->image_path }}" alt="{{ $item->title }}" class="project-thumb">
                                </td>
                                <td>
                                    <span class="project-title-cell">{{ $item->title }}</span>
                                    <div class="project-info-cell font-sans">
                                        <span><strong>CĐT:</strong> {{ $item->client }}</span>
                                        <span>
                                            <strong>Loại:</strong> 
                                            @if($item->category == 'gov')
                                                Bộ ngành TW
                                            @elseif($item->category == 'province')
                                                Tỉnh thành
                                            @else
                                                Khác
                                            @endif
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span style="font-size: 13px; color: #2563EB; font-weight: 700; font-family: inherit;">
                                        {{ $item->value ?: 'Liên hệ' }}
                                    </span>
                                    @if($item->package_value)
                                        <div style="font-size: 11px; color: #64748b;" class="font-sans">Gói: {{ $item->package_value }}</div>
                                    @endif
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
                                        <!-- View Action -->
                                        <button type="button" class="btn-action view-btn" 
                                                data-title="{{ $item->title }}" 
                                                data-client="{{ $item->client }}" 
                                                data-category="{{ $item->category == 'gov' ? 'Bộ ngành TW' : ($item->category == 'province' ? 'Tỉnh thành' : 'Khác') }}" 
                                                data-scope="{{ $item->scope }}" 
                                                data-value="{{ $item->value ?: 'Chưa cập nhật' }}" 
                                                data-package-value="{{ $item->package_value ?: 'Không có' }}" 
                                                data-details="{{ $item->details }}" 
                                                data-image="{{ $item->image_path }}"
                                                title="Xem chi tiết">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <!-- Edit Action -->
                                        <a href="/admin/projects/{{ $item->id }}/edit" class="btn-action" title="Chỉnh sửa">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </a>
                                        <!-- Delete Action -->
                                        <form method="POST" action="/admin/projects/delete" onsubmit="return confirm('Bạn có chắc chắn muốn xóa dự án này?');" style="margin: 0;">
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
                                <td colspan="5" style="text-align: center; color: #64748b; padding: 30px;">
                                    Chưa có dự án nào được đăng.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal Popup Xem chi tiết dự án -->
<div class="modal-backdrop" id="projectDetailModal">
    <div class="modal-content-card">
        <div class="modal-header">
            <h3>Chi tiết hồ sơ dự án</h3>
            <button type="button" class="modal-close-btn" id="closeModalBtn">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <img src="" alt="Cover Image" class="modal-project-img" id="modalImg">
            <h2 class="modal-project-title" id="modalTitle"></h2>
            
            <div class="modal-meta-grid font-sans">
                <div class="modal-meta-item">
                    <strong>Chủ đầu tư:</strong>
                    <span id="modalClient"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Phân loại:</strong>
                    <span id="modalCategory"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Giá trị thực hiện:</strong>
                    <span id="modalValue" style="color: #2563EB; font-weight: 700;"></span>
                </div>
                <div class="modal-meta-item">
                    <strong>Dự toán gói thầu:</strong>
                    <span id="modalPackageValue"></span>
                </div>
            </div>

            <div class="modal-project-scope" id="modalScope"></div>
            
            <div class="modal-project-details-title">Đầu mục công việc chi tiết:</div>
            <ul class="modal-project-details" id="modalDetails"></ul>
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
    // 1. Instant Search & Filtering
    const searchInput = document.getElementById('projectSearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.project-row');
    const emptyRow = document.getElementById('emptyRow');

    let currentFilter = 'all';
    let currentSearch = '';

    function applyFilters() {
        let visibleCount = 0;
        rows.forEach(row => {
            const title = row.getAttribute('data-title');
            const client = row.getAttribute('data-client');
            const status = row.getAttribute('data-status');

            const matchesSearch = title.includes(currentSearch.toLowerCase()) || client.includes(currentSearch.toLowerCase());
            const matchesFilter = currentFilter === 'all' || status === currentFilter;

            if (matchesSearch && matchesFilter) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show/hide empty state row
        if (rows.length > 0) {
            if (visibleCount === 0) {
                if (!emptyRow) {
                    const tr = document.createElement('tr');
                    tr.id = 'tempEmptyRow';
                    tr.innerHTML = `<td colspan="5" style="text-align: center; color: #64748b; padding: 30px;">Không tìm thấy kết quả phù hợp.</td>`;
                    document.getElementById('projectTableBody').appendChild(tr);
                } else {
                    emptyRow.style.display = '';
                    emptyRow.querySelector('td').innerText = 'Không tìm thấy kết quả phù hợp.';
                }
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
            currentFilter = this.getAttribute('data-status');
            applyFilters();
        });
    });

    // 2. AJAX Status Toggle for projects
    const checkboxes = document.querySelectorAll('.status-toggle-checkbox');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const projectId = this.getAttribute('data-id');
            const statusText = document.getElementById(`status-text-${projectId}`);
            
            statusText.innerText = '...';
            statusText.className = 'status-text';

            fetch('/admin/projects/toggle-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ id: projectId })
            })
            .then(res => {
                if (!res.ok) throw new Error('Yêu cầu thất bại');
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    const isVisible = data.is_visible;
                    statusText.innerText = isVisible ? 'Hiện' : 'Ẩn';
                    statusText.className = 'status-text ' + (isVisible ? 'visible' : 'hidden');
                    
                    const row = chk.closest('.project-row');
                    if (row) {
                        row.setAttribute('data-status', isVisible ? 'visible' : 'hidden');
                    }
                    applyFilters();
                } else {
                    alert('Lỗi: ' + (data.message || 'Không thể thay đổi trạng thái'));
                    this.checked = !this.checked;
                    statusText.innerText = this.checked ? 'Hiện' : 'Ẩn';
                    statusText.className = 'status-text ' + (this.checked ? 'visible' : 'hidden');
                }
            })
            .catch(err => {
                alert('Có lỗi xảy ra khi kết nối máy chủ.');
                this.checked = !this.checked;
                statusText.innerText = this.checked ? 'Hiện' : 'Ẩn';
                statusText.className = 'status-text ' + (this.checked ? 'visible' : 'hidden');
            });
        });
    });

    // 3. Modal Popup viewing
    const modal = document.getElementById('projectDetailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalClient = document.getElementById('modalClient');
    const modalCategory = document.getElementById('modalCategory');
    const modalScope = document.getElementById('modalScope');
    const modalValue = document.getElementById('modalValue');
    const modalPackageValue = document.getElementById('modalPackageValue');
    const modalDetails = document.getElementById('modalDetails');
    const modalImg = document.getElementById('modalImg');

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const client = this.getAttribute('data-client');
            const category = this.getAttribute('data-category');
            const scope = this.getAttribute('data-scope');
            const value = this.getAttribute('data-value');
            const packageValue = this.getAttribute('data-package-value');
            const detailsRaw = this.getAttribute('data-details');
            const image = this.getAttribute('data-image');

            modalTitle.innerText = title;
            modalClient.innerText = client;
            modalCategory.innerText = category;
            modalScope.innerText = scope;
            modalValue.innerText = value;
            modalPackageValue.innerText = packageValue;
            modalImg.src = image;

            // Render details bullet list
            modalDetails.innerHTML = '';
            if (detailsRaw && detailsRaw.trim() !== '') {
                const lines = detailsRaw.split(/\r?\n/);
                lines.forEach(line => {
                    if (line.trim() !== '') {
                        const li = document.createElement('li');
                        li.innerText = line.trim();
                        modalDetails.appendChild(li);
                    }
                });
            } else {
                modalDetails.innerHTML = '<li style="color:#94a3b8">Không có danh sách công việc chi tiết</li>';
            }

            modal.style.display = 'flex';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('closeModalBtn2').addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});
</script>
@endsection
