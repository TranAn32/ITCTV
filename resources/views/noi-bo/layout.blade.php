<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Quản trị - ITC Company')</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background: #f8fafc;
            color: #1e293b;
            display: flex;
            flex-direction: row;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        .global-nav {
            width: 260px;
            height: 100%;
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            padding: 24px 16px;
            flex-shrink: 0;
            z-index: 1000;
            box-shadow: 4px 0 24px rgba(15, 23, 42, 0.02);
        }
        .global-nav-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
            text-decoration: none;
            color: #0f172a;
            padding: 0 8px;
        }
        .global-nav-logo {
            width: 36px;
            height: 36px;
            background: #2563EB;
            color: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .global-nav-title {
            font-size: 16px;
            font-weight: 800;
        }
        .global-nav-links {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
        }
        .global-nav-link {
            padding: 12px 16px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #475569;
            text-decoration: none;
            transition: all 0.2s;
            font-weight: 600;
            gap: 10px;
            border-left: 3px solid transparent;
        }
        .global-nav-link:hover {
            color: #0f172a;
            background: #f1f5f9;
        }
        .global-nav-link.active {
            color: #2563EB;
            background: #eff6ff;
            border-left-color: #2563EB;
        }
        .global-nav-link svg {
            width: 18px;
            height: 18px;
        }
        .global-nav-right {
            margin-top: auto;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .btn-logout {
            padding: 10px;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            color: #dc2626;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
        }
        .btn-logout:hover { 
            background: #fef2f2; 
            border-color: #fee2e2; 
        }
        .global-main {
            flex: 1;
            height: 100%;
            overflow-y: auto;
            position: relative;
            background: #f8fafc;
        }
    </style>
    @yield('styles')
</head>
<body>

<div class="global-nav">
    <a href="/admin/banner" class="global-nav-brand">
        <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
          <defs>
            <radialGradient id="sphereGrad" cx="32%" cy="32%" r="68%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="28%" stop-color="#E2E8F0" />
              <stop offset="65%" stop-color="#94A3B8" />
              <stop offset="90%" stop-color="#475569" />
              <stop offset="100%" stop-color="#1E293B" />
            </radialGradient>
            <linearGradient id="ringBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1E3A8A" />
              <stop offset="50%" stop-color="#1D4ED8" />
              <stop offset="100%" stop-color="#2563EB" />
            </linearGradient>
            <linearGradient id="ringFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1C3D82" />
              <stop offset="35%" stop-color="#2563EB" />
              <stop offset="65%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>
            <linearGradient id="cubeGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1E3A8A" />
              <stop offset="100%" stop-color="#0F172A" />
            </linearGradient>
            <linearGradient id="cubeGradSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2563EB" />
              <stop offset="100%" stop-color="#1E3A8A" />
            </linearGradient>
            <linearGradient id="cubeGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#2563EB" />
            </linearGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.25" />
            </filter>
          </defs>
          <path d="M 17,44 C 21,29 41,20 63,24 C 75,26 81,32 83,38" stroke="url(#ringBackGrad)" stroke-width="7.2" stroke-linecap="round" fill="none" />
          <circle cx="51" cy="48" r="21.5" fill="url(#sphereGrad)" filter="url(#softShadow)" />
          <path d="M 83,38 C 85,46 76,61 54,69 C 30,78 15,70 13,58 C 12,51 14,46 17,44" stroke="url(#ringFrontGrad)" stroke-width="7.2" stroke-linecap="round" fill="none" />
          <rect x="68" y="24" width="8.5" height="8.5" fill="url(#cubeGradPrimary)" rx="1.5" />
          <rect x="74" y="15" width="6" height="6" fill="url(#cubeGradSecondary)" rx="1.2" />
          <rect x="80" y="10" width="4.5" height="4.5" fill="url(#cubeGradAccent)" rx="1" />
          <rect x="70" y="10" width="3.5" height="3.5" fill="url(#cubeGradPrimary)" rx="0.8" />
        </svg>
        <div style="display:flex;flex-direction:column">
            <span class="global-nav-title" style="line-height: 1; font-weight: 800; font-size: 16px; color:#0f172a; letter-spacing: -0.5px">ITC</span>
            <span style="font-size: 7px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px">Technology Consulting</span>
        </div>
    </a>
    
    <div class="global-nav-links">
        <a href="/admin/banner" class="global-nav-link {{ request()->is('admin/banner') || request()->is('admin') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Quản lý Banner
        </a>
        <a href="/admin/news" class="global-nav-link {{ request()->is('admin/news') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Quản lý Tin tức
        </a>
        <a href="/admin/projects" class="global-nav-link {{ request()->is('admin/projects') || request()->is('admin/projects/*') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Quản lý Dự án
        </a>
        <a href="/admin/services" class="global-nav-link {{ request()->is('admin/services') || request()->is('admin/services/*') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Quản lý Dịch vụ
        </a>
        <a href="/admin/partners" class="global-nav-link {{ request()->is('admin/partners') || request()->is('admin/partners/*') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Quản lý Đối tác
        </a>
        <a href="/admin/gallery" class="global-nav-link {{ request()->is('admin/gallery') || request()->is('admin/gallery/*') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Quản lý Hình ảnh
        </a>
        <a href="/admin/settings" class="global-nav-link {{ request()->is('admin/settings') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            Cài đặt chung
        </a>
    </div>

    <div class="global-nav-right">
        <form method="POST" action="/admin/logout" style="margin: 0">
            @csrf
            <button type="submit" class="btn-logout">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Đăng xuất
            </button>
        </form>
    </div>
</div>

<div class="global-main">
    @yield('content')
</div>

@yield('scripts')
</body>
</html>
