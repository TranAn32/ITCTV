<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập Nội bộ - ITC Company</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background: #f5f6f8;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #111827;
        }
        .login-card {
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: #e1f5ee;
            color: #0f6e56;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 20px;
        }
        h1 { font-size: 20px; margin-bottom: 8px; color: #111827; }
        p { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
        .form-group { text-align: left; margin-bottom: 20px; }
        label { display: block; font-size: 12px; font-weight: 500; color: #6b7280; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e2e4e8;
            border-radius: 8px;
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: border-color 0.15s;
        }
        input:focus { border-color: #5dcaa5; }
        .btn {
            width: 100%;
            padding: 12px;
            background: #0f6e56;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
        }
        .btn:hover { background: #0a5c46; }
        .error { color: #a32d2d; font-size: 13px; margin-bottom: 16px; background: #fcebeb; padding: 10px; border-radius: 8px; }
    </style>
</head>
<body>

<div class="login-card">
    <div class="logo-container" style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08))">
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
        <div style="margin-top: 12px; display: flex; flex-direction: column; align-items: center;">
            <span style="font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; line-height: 1.2;">ITC</span>
            <span style="font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Technology Consulting</span>
        </div>
    </div>
    <h1>Cổng Nội bộ</h1>
    <p>Vui lòng nhập mã truy cập để tiếp tục</p>

    @if($errors->any())
        <div class="error">{{ $errors->first() }}</div>
    @endif

    <form method="POST" action="/noi-bo/login">
        @csrf
        <div class="form-group">
            <label>Mã truy cập</label>
            <input type="password" name="access_code" placeholder="Nhập mã truy cập..." required autofocus>
        </div>
        <button type="submit" class="btn">Đăng nhập</button>
    </form>
</div>

</body>
</html>
