<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('settings')) {
            // Insert default recipient email if it doesn't exist yet
            $exists = DB::table('settings')->where('key', 'contact_recipient_email')->exists();
            if (!$exists) {
                DB::table('settings')->insert([
                    'key' => 'contact_recipient_email',
                    'value' => 'hello@itc.com',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('settings')) {
            DB::table('settings')->where('key', 'contact_recipient_email')->delete();
        }
    }
};
