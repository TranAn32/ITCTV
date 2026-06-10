/**
 * ITC Portal — JavaScript
 * AdminLTE 4 + Bootstrap 5 + Chart.js
 */

import 'bootstrap';
import { OverlayScrollbars } from 'overlayscrollbars';

// --- Dark/Light Mode ---
document.addEventListener('DOMContentLoaded', function () {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('portal-theme') || 'light';
    html.setAttribute('data-bs-theme', savedTheme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-bs-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-bs-theme', next);
            localStorage.setItem('portal-theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }

    // --- OverlayScrollbars for sidebar ---
    const sidebar = document.querySelector('.app-sidebar .nav-sidebar');
    if (sidebar) {
        OverlayScrollbars(sidebar, {
            scrollbars: { autoHide: 'scroll' }
        });
    }

    // --- Toast notifications ---
    window.showToast = function (message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill',
        };

        const id = 'toast-' + Date.now();
        const toastHtml = `
            <div id="${id}" class="toast toast-${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="bi ${icons[type] || icons.info}" style="font-size:18px"></i>
                    <span>${message}</span>
                    <button type="button" class="btn-close btn-close-sm ms-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', toastHtml);
        const toastEl = document.getElementById(id);
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    };

    // --- Confirmation Dialog ---
    window.confirmAction = function (message, callback) {
        const modal = document.getElementById('confirmModal');
        if (!modal) return;

        const msgEl = modal.querySelector('.confirm-message');
        const btnEl = modal.querySelector('.btn-confirm-action');

        if (msgEl) msgEl.textContent = message;

        const bsModal = new bootstrap.Modal(modal);

        // Remove previous listeners
        const newBtn = btnEl.cloneNode(true);
        btnEl.parentNode.replaceChild(newBtn, btnEl);

        newBtn.addEventListener('click', function () {
            bsModal.hide();
            if (typeof callback === 'function') callback();
        });

        bsModal.show();
    };

    // --- Delete form handler ---
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const form = this.closest('form');
            const name = this.getAttribute('data-name') || 'this item';

            confirmAction(`Are you sure you want to delete "${name}"?`, function () {
                form.submit();
            });
        });
    });

    // --- Flash messages from session ---
    const flashSuccess = document.querySelector('meta[name="flash-success"]');
    const flashError = document.querySelector('meta[name="flash-error"]');

    if (flashSuccess && flashSuccess.content) {
        showToast(flashSuccess.content, 'success');
    }
    if (flashError && flashError.content) {
        showToast(flashError.content, 'error');
    }

    // --- File upload zone ---
    const uploadZones = document.querySelectorAll('.file-upload-zone');
    uploadZones.forEach(zone => {
        const input = zone.querySelector('input[type="file"]');

        zone.addEventListener('click', () => input && input.click());

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
            if (input && e.dataTransfer.files.length) {
                input.files = e.dataTransfer.files;
                updateFileName(zone, e.dataTransfer.files[0].name);
            }
        });

        if (input) {
            input.addEventListener('change', () => {
                if (input.files.length) {
                    updateFileName(zone, input.files[0].name);
                }
            });
        }
    });

    function updateFileName(zone, name) {
        const label = zone.querySelector('.file-name');
        if (label) {
            label.textContent = name;
            label.style.color = '#2563eb';
            label.style.fontWeight = '600';
        }
    }
});
