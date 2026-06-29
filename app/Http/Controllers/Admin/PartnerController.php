<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartnerController extends Controller
{
    public function index()
    {
        $partnersList = DB::table('partners')->orderBy('sort_order')->orderByDesc('id')->get();
        return view('noi-bo.partners', compact('partnersList'));
    }

    public function create()
    {
        return view('noi-bo.partners-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:100',
            'partner_logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('partner_logo')) {
            $file = $request->file('partner_logo');
            $filename = 'partner-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/Partners');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $logoPath = '/upload/Partners/' . $filename;

            DB::table('partners')->insert([
                'name' => $request->name,
                'group' => $request->group,
                'logo_path' => $logoPath,
                'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
                'sort_order' => $request->has('sort_order') && $request->sort_order !== null ? (int)$request->sort_order : 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/partners')->with('success', 'Thêm đối tác thành công!');
        }

        return back()->withErrors(['partner_logo' => 'Vui lòng tải lên logo đối tác.'])->withInput();
    }

    public function edit($id)
    {
        $partner = DB::table('partners')->where('id', $id)->first();
        if (!$partner) {
            abort(404, 'Đối tác không tồn tại.');
        }
        return view('noi-bo.partners-edit', compact('partner'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:100',
            'partner_logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
            'sort_order' => 'nullable|integer',
        ]);

        $partner = DB::table('partners')->where('id', $id)->first();
        if (!$partner) {
            return redirect('/admin/partners')->withErrors(['error' => 'Đối tác không tồn tại.']);
        }

        $logoPath = $partner->logo_path;

        if ($request->hasFile('partner_logo')) {
            // Delete old file
            $oldFilepath = public_path($partner->logo_path);
            if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                unlink($oldFilepath);
            }

            // Upload new file
            $file = $request->file('partner_logo');
            $filename = 'partner-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('upload/Partners');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $file->move($uploadPath, $filename);
            $logoPath = '/upload/Partners/' . $filename;
        }

        DB::table('partners')->where('id', $id)->update([
            'name' => $request->name,
            'group' => $request->group,
            'logo_path' => $logoPath,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'sort_order' => $request->has('sort_order') && $request->sort_order !== null ? (int)$request->sort_order : 0,
            'updated_at' => now(),
        ]);

        return redirect('/admin/partners')->with('success', 'Cập nhật đối tác thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $partner = DB::table('partners')->where('id', $request->id)->first();
        if ($partner) {
            $newStatus = !$partner->is_visible;
            DB::table('partners')->where('id', $request->id)->update([
                'is_visible' => $newStatus,
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'is_visible' => $newStatus,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Đối tác không tồn tại.',
        ], 404);
    }

    public function updateOrder(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'sort_order' => 'required|integer',
        ]);

        $partner = DB::table('partners')->where('id', $request->id)->first();
        if ($partner) {
            DB::table('partners')->where('id', $request->id)->update([
                'sort_order' => $request->sort_order,
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'sort_order' => $request->sort_order,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Đối tác không tồn tại.',
        ], 452);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $partner = DB::table('partners')->where('id', $request->id)->first();
        if ($partner) {
            $filepath = public_path($partner->logo_path);
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
            DB::table('partners')->where('id', $request->id)->delete();
            return redirect('/admin/partners')->with('success', 'Đã xóa đối tác thành công!');
        }

        return redirect('/admin/partners')->withErrors(['error' => 'Không tìm thấy đối tác để xóa.']);
    }

    public function apiIndex()
    {
        $partnersList = DB::table('partners')
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();
        
        $mappedPartners = $partnersList->map(function ($partner) {
            return [
                'name' => $partner->name,
                'group' => $partner->group,
                'logo' => $partner->logo_path,
            ];
        });

        return response()->json($mappedPartners);
    }
}
