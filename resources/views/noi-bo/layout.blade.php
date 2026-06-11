<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Quản trị - ITC Company')</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
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
        <a href="/admin/access-code" class="global-nav-link {{ request()->is('admin/access-code') ? 'active' : '' }}">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
            Mã Truy Cập
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
