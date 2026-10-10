<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminAndCertificatesSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Superadmin User
        $admin = User::updateOrCreate(
            ['email' => 'ridwan@gmail.com'],
            [
                'name' => 'Ridwan Prakoso',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        echo "Superadmin created: " . $admin->email . " (Password: admin123)\n";

        // 2. Certificates
        $jsonPath = base_path('../frontend/src/data/certificates.json');
        if (file_exists($jsonPath)) {
            $certs = json_decode(file_get_contents($jsonPath), true);
            foreach ($certs as $idx => $c) {
                Certificate::updateOrCreate(
                    ['slug' => $c['id']],
                    [
                        'title' => $c['title'],
                        'issuer' => $c['issuer'],
                        'issuer_org' => $c['issuerOrg'] ?? $c['issuer'],
                        'category' => $c['category'],
                        'image' => $c['image'],
                        'accent_color' => $c['accentColor'] ?? null,
                        'issue_date' => $c['issueDate'],
                        'expiration_date' => $c['expirationDate'] ?? 'No Expiration',
                        'credential_id' => $c['credentialId'],
                        'verify_url' => $c['verifyUrl'],
                        'description' => $c['description'],
                        'overview' => $c['overview'] ?? null,
                        'skills' => $c['skills'] ?? [],
                        'curriculum' => $c['curriculum'] ?? [],
                        'highlights' => $c['highlights'] ?? [],
                        'sort_order' => $idx + 1,
                    ]
                );
            }
            echo "Seeded " . count($certs) . " certificates.\n";
        }
    }
}
