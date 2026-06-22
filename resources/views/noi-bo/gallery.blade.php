@extends('noi-bo.layout')

@section('title', 'Quản lý Hình ảnh - Quản trị ITC')

@section('styles')
<style>
    .dashboard {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }
    .gallery-container {
        max-width: 1100px;
        margin: 40px auto;
        padding: 0 20px;
    }
    .gallery-card {
        background: #fff;
        border: 1px solid #e2e4e8;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }
    .gallery-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 16px;
    }
    .gallery-card h2 {
        font-size: 20px;
        color: #111827;
        font-weight: 750;
        margin: 0;
    }
    .gallery-card .subtitle {
        font-size: 13px;
        color: #6b7280;
    }
    .btn-create-gallery {
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
    .btn-create-gallery:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
    }
    .btn-create-gallery:active {
        transform: translateY(0);
    }
    .btn-create-gallery svg {
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

    /* Table Styles */
    .gallery-table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #fff;
    }
    .gallery-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    .gallery-table th {
        background: #f8fafc;
        padding: 14px 16px;
        font-size: 12px;
        font-weight: 700;
        color: #475569;
        border-bottom: 1px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .gallery-table td {
        padding: 16px;
        font-size: 14px;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
    }
    .gallery-table tr:hover {
        background: #fafbfc;
    }
    .gallery-img-preview {
        height: 64px;
        width: 96px;
        object-fit: cover;
        border-radius: 8px;
        background: #fafafa;
        border: 1px solid #e2e8f0;
    }
    .gallery-caption-cell {
        font-size: 13px;
        color: #374151;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .gallery-order-cell {
        font-size: 13px;
        color: #6b7280;
        font-weight: 600;
        text-align: center;
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
</style>
@endsection

@section('content')
<div class="dashboard">
    <div class="gallery-container">
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

        <!-- Gallery Header và Nút Tạo mới -->
        <div class="gallery-card">
            <div class="gallery-card-header">
                <div>
                    <h2>Quản lý Hình ảnh công ty</h2>
                    <p class="subtitle font-sans">Tải lên, quản lý và sắp xếp hình ảnh hoạt động của công ty.</p>
                </div>
                <a href="/admin/gallery/create" class="btn-create-gallery">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Thêm hình ảnh</span>
                </a>
            </div>

            <!-- Tìm kiếm -->
            <div class="filter-bar">
                <div class="search-input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="gallerySearchInput" class="search-control" placeholder="Tìm kiếm theo trích dẫn...">
                </div>
            </div>

            <!-- Bảng Hình ảnh -->
            <div class="gallery-table-wrapper">
                <table class="gallery-table">
                    <thead>
                        <tr>
                            <th style="width: 120px;">Ảnh</th>
                            <th>Trích dẫn</th>
                            <th style="width: 100px; text-align: center;">Thứ tự</th>
                            <th style="width: 150px; text-align: center;">Trạng thái</th>
                            <th style="width: 130px; text-align: center;">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="galleryTableBody">
                        @forelse($galleryList as $item)
                            <tr class="gallery-row" 
                                data-caption="{{ strtolower($item->caption ?? '') }}"
                                data-status="{{ $item->is_visible ? 'visible' : 'hidden' }}">
                                <td>
                                    <img src="{{ $item->image_path }}" alt="{{ $item->caption ?? 'Hình ảnh' }}" class="gallery-img-preview">
                                </td>
                                <td>
                                    <span class="gallery-caption-cell">{{ $item->caption ?? '—' }}</span>
                                </td>
                                <td>
                                    <span class="gallery-order-cell">{{ $item->sort_order }}</span>
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
                                        <!-- Edit Action -->
                                        <a href="/admin/gallery/{{ $item->id }}/edit" class="btn-action" title="Chỉnh sửa">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </a>
                                        <!-- Delete Action -->
                                        <form method="POST" action="/admin/gallery/delete" onsubmit="return confirm('Bạn có chắc chắn muốn xóa hình ảnh này?');" style="margin: 0;">
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
                                    Chưa có hình ảnh nào được tải lên.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 1. Search Filtering
    const searchInput = document.getElementById('gallerySearchInput');
    const rows = document.querySelectorAll('.gallery-row');
    const emptyRow = document.getElementById('emptyRow');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        let visibleCount = 0;
        rows.forEach(row => {
            const caption = row.getAttribute('data-caption');
            if (caption.includes(query)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        if (rows.length > 0) {
            if (visibleCount === 0) {
                if (!emptyRow) {
                    const tr = document.createElement('tr');
                    tr.id = 'tempEmptyRow';
                    tr.innerHTML = `<td colspan="5" style="text-align: center; color: #64748b; padding: 30px;">Không tìm thấy kết quả phù hợp.</td>`;
                    document.getElementById('galleryTableBody').appendChild(tr);
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
    });

    // 2. AJAX Status Toggle
    const checkboxes = document.querySelectorAll('.status-toggle-checkbox');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const imageId = this.getAttribute('data-id');
            const statusText = document.getElementById(`status-text-${imageId}`);
            
            statusText.innerText = '...';
            statusText.className = 'status-text';

            fetch('/admin/gallery/toggle-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ id: imageId })
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
                    
                    const row = chk.closest('.gallery-row');
                    if (row) {
                        row.setAttribute('data-status', isVisible ? 'visible' : 'hidden');
                    }
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
});
</script>
@endsection
