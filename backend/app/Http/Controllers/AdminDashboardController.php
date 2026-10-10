<?php

namespace App\Http\Controllers;

use App\Models\BrandLogo;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\DesignTool;
use App\Models\Experience;
use App\Models\PortfolioProject;
use App\Models\ProfileInfo;
use App\Models\ProjectShowcase;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminDashboardController extends Controller
{
    public function dashboardStats()
    {
        return response()->json([
            'profile' => ProfileInfo::first(),
            'services' => Service::orderBy('sort_order')->get(),
            'experiences' => Experience::orderBy('sort_order')->get(),
            'projects_showcase' => ProjectShowcase::orderBy('sort_order')->get(),
            'portfolio' => PortfolioProject::orderBy('sort_order')->get(),
            'certificates' => Certificate::orderBy('sort_order')->get(),
            'brand_logos' => BrandLogo::orderBy('sort_order')->get(),
            'design_tools' => DesignTool::orderBy('sort_order')->get(),
            'messages' => ContactMessage::latest()->get(),
            'counts' => [
                'services' => Service::count(),
                'experiences' => Experience::count(),
                'projects_showcase' => ProjectShowcase::count(),
                'portfolio' => PortfolioProject::count(),
                'certificates' => Certificate::count(),
                'brand_logos' => BrandLogo::count(),
                'design_tools' => DesignTool::count(),
                'messages' => ContactMessage::count(),
            ],
            'recent_messages' => ContactMessage::latest()->take(5)->get(),
        ]);
    }

    // --- Profile Info ---
    public function updateProfile(Request $request)
    {
        if ($request->has('rating_score') && filled($request->rating_score)) {
            $cleanedScore = str_replace(',', '.', (string)$request->rating_score);
            $request->merge([
                'rating_score' => is_numeric($cleanedScore) ? (float)$cleanedScore : $request->rating_score,
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'availability_badge' => 'nullable|string|max:255',
            'headline' => 'required|string|max:255',
            'bio' => 'required|string',
            'rating_score' => 'nullable|numeric',
            'rating_text' => 'nullable|string|max:255',
            'stats' => 'nullable|array',
            'social_links' => 'nullable|array',
            'skills_row1' => 'nullable|array',
            'skills_row2' => 'nullable|array',
            'about_paragraphs' => 'nullable|array',
            'about_image' => 'nullable|string|max:2048',
            'about_tools_title' => 'nullable|string|max:255',
            'about_tools_description' => 'nullable|string',
        ]);

        $profile = ProfileInfo::first();
        if ($profile) {
            $profile->update($validated);
        } else {
            $profile = ProfileInfo::create($validated);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $profile,
        ]);
    }

    // --- Services ---
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:100',
            'images' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $service = Service::create($validated);

        return response()->json(['success' => true, 'data' => $service], 201);
    }

    public function updateService(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:100',
            'images' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $service->update($validated);

        return response()->json(['success' => true, 'data' => $service]);
    }

    public function destroyService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['success' => true, 'message' => 'Service deleted']);
    }

    // --- Experiences ---
    public function storeExperience(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'employment_type' => 'nullable|string|max:100',
            'period' => 'required|string|max:100',
            'description' => 'nullable|string',
            'bullets' => 'nullable|array',
            'skills' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $experience = Experience::create($validated);

        return response()->json(['success' => true, 'data' => $experience], 201);
    }

    public function updateExperience(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'employment_type' => 'nullable|string|max:100',
            'period' => 'required|string|max:100',
            'description' => 'nullable|string',
            'bullets' => 'nullable|array',
            'skills' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $experience->update($validated);

        return response()->json(['success' => true, 'data' => $experience]);
    }

    public function destroyExperience($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return response()->json(['success' => true, 'message' => 'Experience deleted']);
    }

    // --- Projects Showcase ---
    public function storeProjectShowcase(Request $request)
    {
        if ($request->has('title') && !$request->has('name')) {
            $request->merge(['name' => $request->title]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'nullable|string|max:100',
            'period' => 'nullable|string|max:100',
            'logo' => 'nullable|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'tools' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $project = ProjectShowcase::create($validated);

        return response()->json(['success' => true, 'data' => $project], 201);
    }

    public function updateProjectShowcase(Request $request, $id)
    {
        $project = ProjectShowcase::findOrFail($id);

        if ($request->has('title') && !$request->has('name')) {
            $request->merge(['name' => $request->title]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'nullable|string|max:100',
            'period' => 'nullable|string|max:100',
            'logo' => 'nullable|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'tools' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $project->update($validated);

        return response()->json(['success' => true, 'data' => $project]);
    }

    public function destroyProjectShowcase($id)
    {
        $project = ProjectShowcase::findOrFail($id);
        $project->delete();

        return response()->json(['success' => true, 'message' => 'Project showcase deleted']);
    }

    // --- Portfolio Projects ---
    public function storePortfolio(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:portfolio_projects,slug',
            'description' => 'required|string',
            'image_light' => 'required|string|max:255',
            'image_dark' => 'nullable|string|max:255',
            'project_url' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }

        $project = PortfolioProject::create($validated);

        return response()->json(['success' => true, 'data' => $project], 201);
    }

    public function updatePortfolio(Request $request, $id)
    {
        $project = PortfolioProject::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:portfolio_projects,slug,' . $id,
            'description' => 'required|string',
            'image_light' => 'required|string|max:255',
            'image_dark' => 'nullable|string|max:255',
            'project_url' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $project->update($validated);

        return response()->json(['success' => true, 'data' => $project]);
    }

    public function destroyPortfolio($id)
    {
        $project = PortfolioProject::findOrFail($id);
        $project->delete();

        return response()->json(['success' => true, 'message' => 'Portfolio project deleted']);
    }

    // --- Certificates ---
    public function storeCertificate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issuer_org' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'slug' => 'nullable|string|max:255|unique:certificates,slug',
            'image' => 'required|string|max:255',
            'issue_date' => 'nullable|string|max:100',
            'expiration_date' => 'nullable|string|max:100',
            'credential_id' => 'nullable|string|max:255',
            'verify_url' => 'nullable|string|max:255',
            'description' => 'required|string',
            'overview' => 'nullable|string',
            'skills' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'highlights' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }

        if (empty($validated['issuer_org'])) {
            $validated['issuer_org'] = $validated['issuer'];
        }

        if (empty($validated['issue_date'])) {
            $validated['issue_date'] = date('M Y');
        }

        $certificate = Certificate::create($validated);

        return response()->json(['success' => true, 'data' => $certificate], 201);
    }

    public function updateCertificate(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issuer_org' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'slug' => 'nullable|string|max:255|unique:certificates,slug,' . $id,
            'image' => 'required|string|max:255',
            'issue_date' => 'nullable|string|max:100',
            'expiration_date' => 'nullable|string|max:100',
            'credential_id' => 'nullable|string|max:255',
            'verify_url' => 'nullable|string|max:255',
            'description' => 'required|string',
            'overview' => 'nullable|string',
            'skills' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'highlights' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        if (empty($validated['issuer_org'])) {
            $validated['issuer_org'] = $validated['issuer'];
        }

        $certificate->update($validated);

        return response()->json(['success' => true, 'data' => $certificate]);
    }

    public function destroyCertificate($id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();

        return response()->json(['success' => true, 'message' => 'Certificate deleted']);
    }

    // --- Brand Logos ---
    public function storeBrandLogo(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $brand = BrandLogo::create($validated);

        return response()->json(['success' => true, 'data' => $brand], 201);
    }

    public function updateBrandLogo(Request $request, $id)
    {
        $brand = BrandLogo::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $brand->update($validated);

        return response()->json(['success' => true, 'data' => $brand]);
    }

    public function destroyBrandLogo($id)
    {
        $brand = BrandLogo::findOrFail($id);
        $brand->delete();

        return response()->json(['success' => true, 'message' => 'Brand logo deleted']);
    }

    // --- Design Tools ---
    public function storeDesignTool(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'dark_icon' => 'nullable|string|max:255',
            'href' => 'nullable|string|max:255',
            'show_name' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $tool = DesignTool::create($validated);

        return response()->json(['success' => true, 'data' => $tool], 201);
    }

    public function updateDesignTool(Request $request, $id)
    {
        $tool = DesignTool::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'dark_icon' => 'nullable|string|max:255',
            'href' => 'nullable|string|max:255',
            'show_name' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $tool->update($validated);

        return response()->json(['success' => true, 'data' => $tool]);
    }

    public function destroyDesignTool($id)
    {
        $tool = DesignTool::findOrFail($id);
        $tool->delete();

        return response()->json(['success' => true, 'message' => 'Design tool deleted']);
    }

    // --- Contact Messages ---
    public function getMessages()
    {
        return response()->json(ContactMessage::latest()->get());
    }

    public function destroyMessage($id)
    {
        $msg = ContactMessage::findOrFail($id);
        $msg->delete();

        return response()->json(['success' => true, 'message' => 'Message deleted']);
    }

    // --- Image Upload ---
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,webp,svg,svgz,gif|max:10240',
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();

        $backendUploadPath = public_path('uploads');
        if (!file_exists($backendUploadPath)) {
            mkdir($backendUploadPath, 0755, true);
        }
        $file->move($backendUploadPath, $filename);

        $frontendUploadPath = base_path('../frontend/public/uploads');
        if (!file_exists($frontendUploadPath)) {
            mkdir($frontendUploadPath, 0755, true);
        }
        @copy($backendUploadPath . '/' . $filename, $frontendUploadPath . '/' . $filename);

        return response()->json([
            'success' => true,
            'url' => '/uploads/' . $filename,
        ]);
    }
}
