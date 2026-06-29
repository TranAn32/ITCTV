<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    public function index()
    {
        $emailSetting = DB::table('settings')->where('key', 'contact_recipient_email')->first();
        $recipientEmail = $emailSetting ? $emailSetting->value : 'hello@itc.com';

        return view('noi-bo.settings', compact('recipientEmail'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'current_code' => 'nullable|string',
            'new_code' => 'nullable|string|min:4|confirmed',
            'recipient_email' => 'required|email|max:255',
        ]);

        // 1. Update Recipient Email
        DB::table('settings')->updateOrInsert(
            ['key' => 'contact_recipient_email'],
            [
                'value' => $request->recipient_email,
                'updated_at' => now()
            ]
        );

        // 2. Update Access Code if provided
        if (!empty($request->new_code)) {
            if (empty($request->current_code)) {
                return back()->withErrors(['current_code' => 'Vui lòng cung cấp mã truy cập hiện tại để đổi mã mới.']);
            }

            $setting = DB::table('settings')->where('key', 'portal_access_code')->first();
            if (!$setting || !Hash::check($request->current_code, $setting->value)) {
                return back()->withErrors(['current_code' => 'Mã truy cập hiện tại không đúng.']);
            }

            DB::table('settings')
                ->where('key', 'portal_access_code')
                ->update(['value' => Hash::make($request->new_code)]);
        }

        return back()->with('success', 'Cập nhật cài đặt chung thành công.');
    }
}
