<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Permission::create(['name' => 'posts.create']);
      Permission::create(['name' => 'posts.update']);
      Permission::create(['name' => 'posts.delete']);
    }
}
