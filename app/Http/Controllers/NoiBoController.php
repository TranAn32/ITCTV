<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NoiBoController extends Controller
{
    public function index()
    {
        return redirect('/noi-bo/van-ban');
    }

    public function login()
    {
        return view('noi-bo.login');
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            'access_code' => 'required|string',
        ]);

        $setting = DB::table('settings')->where('key', 'portal_access_code')->first();

        if ($setting && Hash::check($request->access_code, $setting->value)) {
            $request->session()->put('noibo_authenticated', true);
            return redirect('/noi-bo');
        }

        return back()->withErrors([
            'access_code' => 'Mã truy cập không hợp lệ.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('noibo_authenticated');
        return redirect('/noi-bo/login');
    }

    public function vanBan()
    {
        return view('noi-bo.van-ban');
    }

    public function sinhSo()
    {
        return view('noi-bo.sinh-so');
    }

    public function accessCode()
    {
        return view('noi-bo.access-code');
    }

    public function updateAccessCode(Request $request)
    {
        $request->validate([
            'current_code' => 'required|string',
            'new_code' => 'required|string|min:4|confirmed',
        ]);

        $setting = DB::table('settings')->where('key', 'portal_access_code')->first();

        if (!$setting || !Hash::check($request->current_code, $setting->value)) {
            return back()->withErrors(['current_code' => 'Mã truy cập hiện tại không đúng.']);
        }

        DB::table('settings')
            ->where('key', 'portal_access_code')
            ->update(['value' => Hash::make($request->new_code)]);

        return back()->with('success', 'Đổi mã truy cập thành công.');
    }
}
