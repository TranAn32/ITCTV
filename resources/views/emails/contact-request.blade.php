<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yêu cầu tư vấn mới</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
        }
        .header {
            background-color: #2563EB;
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }
        .header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
        }
        .content {
            padding: 30px;
        }
        .field-group {
            margin-bottom: 18px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 10px;
        }
        .field-group:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .field-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .field-value {
            font-size: 15px;
            color: #1e293b;
            line-height: 1.5;
        }
        .field-value-highlight {
            font-weight: bold;
            color: #2563EB;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>

<div class="email-container">
    <div class="header">
        <h2>Yêu Cầu Tư Vấn Công Nghệ Mới</h2>
    </div>
    
    <div class="content">
        <div class="field-group">
            <div class="field-label">Họ và tên</div>
            <div class="field-value field-value-highlight">{{ $formData['fullName'] ?? 'Không rõ' }}</div>
        </div>

        <div class="field-group">
            <div class="field-label">Đơn vị / Cơ quan</div>
            <div class="field-value">{{ $formData['organization'] ?? 'Không rõ' }}</div>
        </div>

        <div class="field-group">
            <div class="field-label">Số điện thoại liên hệ</div>
            <div class="field-value">{{ $formData['phone'] ?? 'Không rõ' }}</div>
        </div>

        <div class="field-group">
            <div class="field-label">Địa chỉ email</div>
            <div class="field-value">{{ $formData['email'] ?? 'Không rõ' }}</div>
        </div>

        <div class="field-group">
            <div class="field-label">Lĩnh vực cần tư vấn</div>
            <div class="field-value">
                @switch($formData['serviceField'] ?? '')
                    @case('khao-sat-cntt')
                        Tư vấn Khảo sát & Đề cương CNTT
                        @break
                    @case('thiet-ke-du-toan')
                        Thiết kế cơ sở & Thẩm tra Dự toán
                        @break
                    @case('giam-sat-kiem-thu')
                        Giám sát độc lập & Kiểm thử phần mềm
                        @break
                    @default
                        {{ $formData['serviceField'] ?? 'Tư vấn công nghệ' }}
                @endswitch
            </div>
        </div>

        <div class="field-group">
            <div class="field-label">Nội dung yêu cầu chi tiết</div>
            <div class="field-value" style="white-space: pre-wrap;">{{ $formData['message'] ?? 'Không có nội dung' }}</div>
        </div>
    </div>
    
    <div class="footer">
        Thư này được gửi tự động từ hệ thống ITC Portal. Vui lòng không trả lời trực tiếp email này.
    </div>
</div>

</body>
</html>
