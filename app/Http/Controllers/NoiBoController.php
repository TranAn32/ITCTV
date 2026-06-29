<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NoiBoController extends Controller
{
    public function index()
    {
        return redirect('/admin/banner');
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
            return redirect('/admin');
        }

        return back()->withErrors([
            'access_code' => 'Mã truy cập không hợp lệ.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('noibo_authenticated');
        return redirect('/admin/login');
    }
}
