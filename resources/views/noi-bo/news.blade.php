@extends('noi-bo.layout')

@section('title', 'Quản lý Tin tức - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .news-container {
        max-width: 1100px;
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
    .news-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-b: 1px solid #f1f5f9;
        padding-bottom: 16px;
    }
    .news-card h2 {
        font-size: 20px;
        color: #111827;
        font-weight: 750;
        margin: 0;
    }
    .news-card .subtitle {
        font-size: 13px;
        color: #6b7280;
    }
    .btn-create-news {
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
    .btn-create-news:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
    }
    .btn-create-news:active {
        transform: translateY(0);
    }
    .btn-create-news svg {
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
    .news-table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #fff;
    }
    .news-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .news-table th {
        background: #f8fafc;
        padding: 14px 16px;
        font-size: 12px;
        font-weight: 700;
        color: #475569;
        border-bottom: 1px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .news-table td {
        padding: 16px;
        font-size: 14px;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
    }
    .news-table tr:hover {
        background: #fafbfc;
    }
    .news-thumb {
        width: 80px;
        height: 52px;
        object-fit: cover;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
    }
    .news-title-cell {
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
        display: block;
        line-height: 1.4;
    }
    .news-summary-cell {
        font-size: 12px;
        color: #64748b;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
    .modal-article-img {
        width: 100%;
        max-height: 280px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #e2e8f0;
    }
    .modal-article-title {
        font-size: 20px;
        font-weight: 850;
        color: #0f172a;
        line-height: 1.4;
        margin-bottom: 12px;
    }
    .modal-article-summary {
        font-weight: 600;
        font-size: 13px;
        color: #475569;
        background: #f8fafc;
        border-left: 4px solid #2563EB;
        padding: 12px 16px;
        border-radius: 0 8px 8px 0;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    .modal-article-content {
        font-size: 14px;
        color: #334155;
        line-height: 1.7;
        white-space: pre-wrap;
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
    <div class="news-container">
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

        <!-- Tin Tức Header và Nút Tạo mới -->
        <div class="news-card">
            <div class="news-card-header">
                <div>
                    <h2>Quản lý Tin tức</h2>
                    <p class="subtitle">Hiển thị, tìm kiếm và thay đổi trạng thái đăng các bài viết tin tức.</p>
                </div>
                <a href="/admin/news/create" class="btn-create-news">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Thêm tin mới</span>
                </a>
            </div>

            <!-- Bộ lọc và Tìm kiếm -->
            <div class="filter-bar">
                <div class="search-input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="newsSearchInput" class="search-control" placeholder="Tìm kiếm theo tiêu đề...">
                </div>

                <div class="status-filters">
                    <button class="filter-btn active" data-status="all">Tất cả</button>
                    <button class="filter-btn" data-status="visible">Đang hiển thị</button>
                    <button class="filter-btn" data-status="hidden">Đang ẩn</button>
                </div>
            </div>

            <!-- Bảng Tin Tức -->
            <div class="news-table-wrapper">
                <table class="news-table">
                    <thead>
                        <tr>
                            <th style="width: 100px;">Ảnh</th>
                            <th>Bài viết</th>
                            <th style="width: 150px;">Ngày tạo</th>
                            <th style="width: 150px; text-align: center;">Trạng thái</th>
                            <th style="width: 130px; text-align: center;">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="newsTableBody">
                        @forelse($newsList as $item)
                            <tr class="news-row" data-title="{{ strtolower($item->title) }}" data-status="{{ $item->is_visible ? 'visible' : 'hidden' }}">
                                <td>
                                    <img src="{{ $item->image_path }}" alt="{{ $item->title }}" class="news-thumb">
                                </td>
                                <td>
                                    <span class="news-title-cell">{{ $item->title }}</span>
                                    <span class="news-summary-cell">{{ $item->summary }}</span>
                                </td>
                                <td>
                                    <span style="font-size: 13px; color: #64748b; font-weight: 550;">
                                        {{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y H:i') }}
                                    </span>
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
                                                data-summary="{{ $item->summary }}" 
                                                data-content="{{ $item->content }}" 
                                                data-image="{{ $item->image_path }}"
                                                title="Xem chi tiết">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <!-- Edit Action -->
                                        <a href="/admin/news/{{ $item->id }}/edit" class="btn-action" title="Chỉnh sửa">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </a>
                                        <!-- Delete Action -->
                                        <form method="POST" action="/admin/news/delete" onsubmit="return confirm('Bạn có chắc chắn muốn xóa bài viết này?');" style="margin: 0;">
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
                                    Chưa có bài viết nào được đăng.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal Popup Xem chi tiết bài viết -->
<div class="modal-backdrop" id="newsDetailModal">
    <div class="modal-content-card">
        <div class="modal-header">
            <h3>Chi tiết bài viết</h3>
            <button type="button" class="modal-close-btn" id="closeModalBtn">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <img src="" alt="Cover Image" class="modal-article-img" id="modalImg">
            <h2 class="modal-article-title" id="modalTitle"></h2>
            <div class="modal-article-summary" id="modalSummary"></div>
            <div class="modal-article-content" id="modalContent"></div>
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
    const searchInput = document.getElementById('newsSearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.news-row');
    const emptyRow = document.getElementById('emptyRow');

    let currentFilter = 'all';
    let currentSearch = '';

    function applyFilters() {
        let visibleCount = 0;
        rows.forEach(row => {
            const title = row.getAttribute('data-title');
            const status = row.getAttribute('data-status');

            const matchesSearch = title.includes(currentSearch.toLowerCase());
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
                    document.getElementById('newsTableBody').appendChild(tr);
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

    // 2. AJAX Status Toggle
    const checkboxes = document.querySelectorAll('.status-toggle-checkbox');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const newsId = this.getAttribute('data-id');
            const statusText = document.getElementById(`status-text-${newsId}`);
            
            // Set text feedback during request
            statusText.innerText = '...';
            statusText.className = 'status-text';

            fetch('/admin/news/toggle-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ id: newsId })
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
                    
                    // Update data-status on the row for instant filtering state sync
                    const row = chk.closest('.news-row');
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
    const modal = document.getElementById('newsDetailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSummary = document.getElementById('modalSummary');
    const modalContent = document.getElementById('modalContent');
    const modalImg = document.getElementById('modalImg');

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const summary = this.getAttribute('data-summary');
            const content = this.getAttribute('data-content');
            const image = this.getAttribute('data-image');

            modalTitle.innerText = title;
            modalSummary.innerText = summary;
            modalContent.innerText = content;
            modalImg.src = image;

            modal.style.display = 'flex';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('closeModalBtn2').addEventListener('click', closeModal);
    
    // Close modal on clicking outside content card
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});
</script>
@endsection
