<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactRequestMail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'serviceField' => 'required|string|max:100',
            'message' => 'required|string',
        ]);

        // Fetch configured recipient email address
        $emailSetting = DB::table('settings')->where('key', 'contact_recipient_email')->first();
        $recipientEmail = $emailSetting ? $emailSetting->value : 'hello@itc.com';

        try {
            // Send email using Laravel Mail facility
            Mail::to($recipientEmail)->send(new ContactRequestMail($request->all()));
            
            return response()->json([
                'success' => true,
                'message' => 'Yêu cầu tư vấn đã được gửi thành công!',
            ]);
        } catch (\Exception $e) {
            Log::error('Lỗi gửi email liên hệ: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Lỗi gửi yêu cầu tư vấn: ' . $e->getMessage(),
            ], 500);
        }
    }
}
