<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AuthController;
use App\Models\Blog;
use App\Models\BrandLogo;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\DesignTool;
use App\Models\Experience;
use App\Models\PortfolioProject;
use App\Models\ProfileInfo;
use App\Models\ProjectShowcase;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Landing Page Endpoints
|--------------------------------------------------------------------------
*/

Route::get('/profile', function () {
    return response()->json(ProfileInfo::first());
});

Route::get('/portfolio', function () {
    return response()->json(PortfolioProject::orderBy('sort_order')->get());
});

Route::get('/portfolio/{slug}', function ($slug) {
    $project = PortfolioProject::where('slug', $slug)->firstOrFail();
    return response()->json($project);
});

Route::get('/services', function () {
    return response()->json(Service::orderBy('sort_order')->get());
});

Route::get('/experiences', function () {
    return response()->json(Experience::orderBy('sort_order')->get());
});

Route::get('/projects-showcase', function () {
    return response()->json(ProjectShowcase::orderBy('sort_order')->get());
});

Route::get('/certificates', function () {
    return response()->json(Certificate::orderBy('sort_order')->get());
});

Route::get('/certificates/{slug}', function ($slug) {
    $cert = Certificate::where('slug', $slug)->firstOrFail();
    return response()->json($cert);
});

Route::get('/brand-logos', function () {
    return response()->json(BrandLogo::orderBy('sort_order')->get());
});

Route::get('/design-tools', function () {
    return response()->json(DesignTool::orderBy('sort_order')->get());
});

Route::get('/testimonials', function () {
    return response()->json(Testimonial::orderBy('sort_order')->get());
});

Route::get('/blogs', function () {
    return response()->json(Blog::latest()->get());
});

Route::get('/blogs/{slug}', function ($slug) {
    $blog = Blog::where('slug', $slug)->firstOrFail();
    return response()->json($blog);
});

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'budget' => 'nullable|string|max:100',
        'message' => 'required|string',
        'services' => 'nullable|array',
    ]);

    $validated['ip_address'] = $request->ip();

    $contactMessage = ContactMessage::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Your message has been sent successfully! We will contact you soon.',
        'data' => $contactMessage,
    ], 201);
});

/*
|--------------------------------------------------------------------------
| Superadmin Authentication
|--------------------------------------------------------------------------
*/
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Admin Dashboard Summary
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'dashboardStats']);

    // Profile Info
    Route::put('/admin/profile', [AdminDashboardController::class, 'updateProfile']);

    // Services CRUD
    Route::post('/admin/services', [AdminDashboardController::class, 'storeService']);
    Route::put('/admin/services/{id}', [AdminDashboardController::class, 'updateService']);
    Route::delete('/admin/services/{id}', [AdminDashboardController::class, 'destroyService']);

    // Experiences CRUD
    Route::post('/admin/experiences', [AdminDashboardController::class, 'storeExperience']);
    Route::put('/admin/experiences/{id}', [AdminDashboardController::class, 'updateExperience']);
    Route::delete('/admin/experiences/{id}', [AdminDashboardController::class, 'destroyExperience']);

    // Projects Showcase CRUD
    Route::post('/admin/projects-showcase', [AdminDashboardController::class, 'storeProjectShowcase']);
    Route::put('/admin/projects-showcase/{id}', [AdminDashboardController::class, 'updateProjectShowcase']);
    Route::delete('/admin/projects-showcase/{id}', [AdminDashboardController::class, 'destroyProjectShowcase']);

    // Portfolio Projects CRUD
    Route::post('/admin/portfolio', [AdminDashboardController::class, 'storePortfolio']);
    Route::put('/admin/portfolio/{id}', [AdminDashboardController::class, 'updatePortfolio']);
    Route::delete('/admin/portfolio/{id}', [AdminDashboardController::class, 'destroyPortfolio']);

    // Certificates CRUD
    Route::post('/admin/certificates', [AdminDashboardController::class, 'storeCertificate']);
    Route::put('/admin/certificates/{id}', [AdminDashboardController::class, 'updateCertificate']);
    Route::delete('/admin/certificates/{id}', [AdminDashboardController::class, 'destroyCertificate']);

    // Brand Logos CRUD
    Route::post('/admin/brand-logos', [AdminDashboardController::class, 'storeBrandLogo']);
    Route::put('/admin/brand-logos/{id}', [AdminDashboardController::class, 'updateBrandLogo']);
    Route::delete('/admin/brand-logos/{id}', [AdminDashboardController::class, 'destroyBrandLogo']);

    // Design Tools CRUD
    Route::post('/admin/design-tools', [AdminDashboardController::class, 'storeDesignTool']);
    Route::put('/admin/design-tools/{id}', [AdminDashboardController::class, 'updateDesignTool']);
    Route::delete('/admin/design-tools/{id}', [AdminDashboardController::class, 'destroyDesignTool']);

    // Contact Messages
    Route::get('/admin/messages', [AdminDashboardController::class, 'getMessages']);
    Route::delete('/admin/messages/{id}', [AdminDashboardController::class, 'destroyMessage']);

    // Image Upload
    Route::post('/admin/upload', [AdminDashboardController::class, 'uploadImage']);
});
