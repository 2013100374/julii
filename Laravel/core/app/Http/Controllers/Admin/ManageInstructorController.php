<?php

namespace App\Http\Controllers\Admin;

use App\Constants\Status;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CoursePurchased;
use App\Models\Deposit;
use App\Models\Instructor;
use App\Models\NotificationLog;
use App\Models\NotificationTemplate;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Withdrawal;
use App\Rules\FileTypeValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManageInstructorController extends Controller
{

    public function allInstructors()
    {
        $pageTitle = 'All Instructors';
        $instructors = $this->instructorData();
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function activeInstructors()
    {
        $pageTitle = 'Active Instructors';
        $instructors = $this->instructorData('active');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function bannedInstructors()
    {
        $pageTitle = 'Banned Users';
        $instructors = $this->instructorData('banned');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function emailUnverifiedInstructors()
    {
        $pageTitle = 'Email Unverified Users';
        $instructors = $this->instructorData('emailUnverified');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function kycUnverifiedInstructors()
    {
        $pageTitle = 'KYC Unverified Users';
        $instructors = $this->instructorData('kycUnverified');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function kycPendingInstructors()
    {
        $pageTitle = 'KYC Pending Users';
        $instructors = $this->instructorData('kycPending');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }

    public function emailVerifiedInstructors()
    {
        $pageTitle = 'Email Verified Users';
        $instructors = $this->instructorData('emailVerified');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }


    public function mobileUnverifiedInstructors()
    {
        $pageTitle = 'Mobile Unverified Users';
        $instructors = $this->instructorData('mobileUnverified');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }


    public function mobileVerifiedInstructors()
    {
        $pageTitle = 'Mobile Verified Users';
        $instructors = $this->instructorData('mobileVerified');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }


    public function instructorsWithBalance()
    {
        $pageTitle = 'Users with Balance';
        $instructors = $this->instructorData('withBalance');
        return view('admin.instructors.list', compact('pageTitle', 'instructors'));
    }


    protected function instructorData($scope = null){
        if ($scope) {
            $instructors = Instructor::$scope();
        }else{
            $instructors = Instructor::query();
        }
        return $instructors->searchable(['username','email'])->orderBy('id','desc')->paginate(getPaginate());
    }


    public function detail($id)
    {
        $instructor = Instructor::findOrFail($id);
        $pageTitle = 'Instructor Detail - '.$instructor->username;

        $totalEarning = Transaction::where('instructor_id',$instructor->id)->where('remark','payment_received')->sum('amount');
        $totalWithdrawals = Withdrawal::where('instructor_id',$instructor->id)->approved()->sum('amount');
        $totalTransaction = Transaction::where('instructor_id',$instructor->id)->count();
        $countries = json_decode(file_get_contents(resource_path('views/partials/country.json')));

        
        $course['total_course']        = Course::where('instructor_id', $instructor->id)->count();
        $course['total_approved_course']       = Course::where('instructor_id', $instructor->id)->approved()->count();
        $course['total_pending_course']      = Course::where('instructor_id', $instructor->id)->pending()->count();
        $course['total_rejected_course']        = Course::where('instructor_id', $instructor->id)->rejected()->count();
        
        return view('admin.instructors.detail', compact('pageTitle', 'instructor','totalEarning','totalWithdrawals','totalTransaction','countries','course'));
    }


    public function kycDetails($id)
    {
        $pageTitle = 'KYC Details';
        $instructor = Instructor::findOrFail($id);
        return view('admin.instructors.kyc_detail', compact('pageTitle','instructor'));
    }

    public function kycApprove($id)
    {
        $instructor = Instructor::findOrFail($id);
        $instructor->kv = Status::KYC_VERIFIED;
        $instructor->save();

        notify($instructor,'KYC_APPROVE',[]);

        $notify[] = ['success','KYC approved successfully'];
        return to_route('admin.instructors.kyc.pending')->withNotify($notify);
    }

    public function kycReject(Request $request,$id)
    {
        $request->validate([
            'reason'=>'required'
        ]);
        $instructor = Instructor::findOrFail($id);
        $instructor->kv = Status::KYC_UNVERIFIED;
        $instructor->kyc_rejection_reason = $request->reason;
        $instructor->save();

        notify($instructor,'KYC_REJECT',[
            'reason'=>$request->reason
        ]);

        $notify[] = ['success','KYC rejected successfully'];
        return to_route('admin.instructors.kyc.pending')->withNotify($notify);
    }


    public function update(Request $request, $id)
    {
        $instructor = Instructor::findOrFail($id);
        $countryData = json_decode(file_get_contents(resource_path('views/partials/country.json')));
        $countryArray   = (array)$countryData;
        $countries      = implode(',', array_keys($countryArray));

        $countryCode    = $request->country;
        $country        = $countryData->$countryCode->country;
        $dialCode       = $countryData->$countryCode->dial_code;

        $request->validate([
            'firstname' => 'required|string|max:40',
            'lastname' => 'required|string|max:40',
            'email' => 'required|email|string|max:40|unique:users,email,' . $instructor->id,
            'mobile' => 'required|string|max:40',
            'country' => 'required|in:'.$countries,
        ]);

        $exists = Instructor::where('mobile',$request->mobile)->where('dial_code',$dialCode)->where('id','!=',$instructor->id)->exists();
        if ($exists) {
            $notify[] = ['error', 'The mobile number already exists.'];
            return back()->withNotify($notify);
        }

        $instructor->mobile = $request->mobile;
        $instructor->firstname = $request->firstname;
        $instructor->lastname = $request->lastname;
        $instructor->email = $request->email;

        $instructor->address = $request->address;
        $instructor->city = $request->city;
        $instructor->state = $request->state;
        $instructor->zip = $request->zip;
        $instructor->country_name = @$country;
        $instructor->dial_code = $dialCode;
        $instructor->country_code = $countryCode;

        $instructor->ev = $request->ev ? Status::VERIFIED : Status::UNVERIFIED;
        $instructor->sv = $request->sv ? Status::VERIFIED : Status::UNVERIFIED;
        $instructor->ts = $request->ts ? Status::ENABLE : Status::DISABLE;
        if (!$request->kv) {
            $instructor->kv = Status::KYC_UNVERIFIED;
            if ($instructor->kyc_data) {
                foreach ($instructor->kyc_data as $kycData) {
                    if ($kycData->type == 'file') {
                        fileManager()->removeFile(getFilePath('verify').'/'.$kycData->value);
                    }
                }
            }
            $instructor->kyc_data = null;
        }else{
            $instructor->kv = Status::KYC_VERIFIED;
        }
        $instructor->save();

        $notify[] = ['success', 'Instructor details updated successfully'];
        return back()->withNotify($notify);
    }

    public function addSubBalance(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|gt:0',
            'act' => 'required|in:add,sub',
            'remark' => 'required|string|max:255',
        ]);

        $instructor = instructor::findOrFail($id);
        $amount = $request->amount;
        $trx = getTrx();

        $transaction = new Transaction();

        if ($request->act == 'add') {
            $instructor->balance += $amount;

            $transaction->trx_type = '+';
            $transaction->remark = 'balance_add';

            $notifyTemplate = 'BAL_ADD';

            $notify[] = ['success', 'Balance added successfully'];

        } else {
            if ($amount > $instructor->balance) {
                $notify[] = ['error', $instructor->username . ' doesn\'t have sufficient balance.'];
                return back()->withNotify($notify);
            }

            $instructor->balance -= $amount;

            $transaction->trx_type = '-';
            $transaction->remark = 'balance_subtract';

            $notifyTemplate = 'BAL_SUB';
            $notify[] = ['success', 'Balance subtracted successfully'];
        }

        $instructor->save();

        $transaction->user_id = $instructor->id;
        $transaction->amount = $amount;
        $transaction->post_balance = $instructor->balance;
        $transaction->charge = 0;
        $transaction->trx =  $trx;
        $transaction->details = $request->remark;
        $transaction->save();

        notify($instructor, $notifyTemplate, [
            'trx' => $trx,
            'amount' => showAmount($amount,currencyFormat:false),
            'remark' => $request->remark,
            'post_balance' => showAmount($instructor->balance,currencyFormat:false)
        ]);

        return back()->withNotify($notify);
    }

 

    public function status(Request $request,$id)
    {
        $instructor = Instructor::findOrFail($id);
        if ($instructor->status == Status::USER_ACTIVE) {
            $request->validate([
                'reason'=>'required|string|max:255'
            ]);
            $instructor->status = Status::USER_BAN;
            $instructor->ban_reason = $request->reason;
            $notify[] = ['success','User banned successfully'];
        }else{
            $instructor->status = Status::USER_ACTIVE;
            $instructor->ban_reason = null;
            $notify[] = ['success','User unbanned successfully'];
        }
        $instructor->save();
        return back()->withNotify($notify);

    }


    public function showNotificationSingleForm($id)
    {
        $instructor = Instructor::findOrFail($id);
        if (!gs('en') && !gs('sn') && !gs('pn')) {
            $notify[] = ['warning','Notification options are disabled currently'];
            return to_route('admin.instructors.detail',$instructor->id)->withNotify($notify);
        }
        $pageTitle = 'Send Notification to ' . $instructor->username;
        return view('admin.instructors.notification_single', compact('pageTitle', 'instructor'));
    }

    public function sendNotificationSingle(Request $request, $id)
    {
        $request->validate([
            'message' => 'required',
            'via'     => 'required|in:email,sms,push',
            'subject' => 'required_if:via,email,push',
            'image'   => ['nullable', 'image', new FileTypeValidate(['jpg', 'jpeg', 'png'])],
        ]);

        if (!gs('en') && !gs('sn') && !gs('pn')) {
            $notify[] = ['warning', 'Notification options are disabled currently'];
            return to_route('admin.dashboard')->withNotify($notify);
        }

        $imageUrl = null;
        if($request->via == 'push' && $request->hasFile('image')){
            $imageUrl = fileUploader($request->image, getFilePath('push'));
        }

        $template = NotificationTemplate::where('act', 'DEFAULT')->where($request->via.'_status', Status::ENABLE)->exists();
        if(!$template){
            $notify[] = ['warning', 'Default notification template is not enabled'];
            return back()->withNotify($notify);
        }

        $instructor = Instructor::findOrFail($id);
        notify($instructor,'DEFAULT',[
            'subject'=>$request->subject,
            'message'=>$request->message,
        ],[$request->via],pushImage:$imageUrl);
        $notify[] = ['success', 'Notification sent successfully'];
        return back()->withNotify($notify);
    }

    public function showNotificationAllForm()
    {
        if (!gs('en') && !gs('sn') && !gs('pn')) {
            $notify[] = ['warning', 'Notification options are disabled currently'];
            return to_route('admin.dashboard')->withNotify($notify);
        }

        $notifyToInstructor = Instructor::instructorNotify();
        $instructors        = Instructor::active()->count();
        $pageTitle    = 'Notification to Verified Instructors';

        if (session()->has('SEND_NOTIFICATION') && !request()->email_sent) {
            session()->forget('SEND_NOTIFICATION');
        }

        return view('admin.instructors.notification_all', compact('pageTitle', 'instructors', 'notifyToInstructor'));
    }

    public function sendNotificationAll(Request $request)
    {
        $request->validate([
            'via'                          => 'required|in:email,sms,push',
            'message'                      => 'required',
            'subject'                      => 'required_if:via,email,push',
            'start'                        => 'required|integer|gte:1',
            'batch'                        => 'required|integer|gte:1',
            'being_sent_to'                => 'required',
            'cooling_time'                 => 'required|integer|gte:1',
            'number_of_days'               => 'required_if:being_sent_to,notLoginInstructors|integer|gte:0',
            'image'                        => ["nullable", 'image', new FileTypeValidate(['jpg', 'jpeg', 'png'])],
        ], [
            'number_of_days.required_if'               => "Number of days field is required",
        ]);
        
        if (!gs('en') && !gs('sn') && !gs('pn')) {
            $notify[] = ['warning', 'Notification options are disabled currently'];
            return to_route('admin.dashboard')->withNotify($notify);
        }
        

        $template = NotificationTemplate::where('act', 'DEFAULT')->where($request->via.'_status', Status::ENABLE)->exists();
        if(!$template){
            $notify[] = ['warning', 'Default notification template is not enabled'];
            return back()->withNotify($notify);
        }
        
   
        
        if ($request->being_sent_to == 'selectedInstructors') {
            if (session()->has("SEND_NOTIFICATION")) {
                $request->merge(['instructor' => session()->get('SEND_NOTIFICATION')['instructor']]);
            } else {
                
                if (!$request->instructor || !is_array($request->instructor) || empty($request->instructor)) {
                  
                    $notify[] = ['error', "Ensure that the instructor field is populated when sending an email to the designated instructor group"];
                    return back()->withNotify($notify);
                }
            }
        }

        $scope          = $request->being_sent_to;
        $instructorQuery      = Instructor::oldest()->active()->$scope();

        if (session()->has("SEND_NOTIFICATION")) {
            $totalInstructorCount = session('SEND_NOTIFICATION')['total_instructor'];
        } else {
            $totalInstructorCount = (clone $instructorQuery)->count() - ($request->start-1);
        }

        if ($totalInstructorCount <= 0) {
            $notify[] = ['error', "Notification recipients were not found among the selected instructor base."];
            return back()->withNotify($notify);
        }

        $imageUrl = null;

        if ($request->via == 'push' && $request->hasFile('image')) {
            if (session()->has("SEND_NOTIFICATION")) {
                $request->merge(['image' => session()->get('SEND_NOTIFICATION')['image']]);
            }
            if ($request->hasFile("image")) {
                $imageUrl = fileUploader($request->image, getFilePath('push'));
            }
        }

        $instructors = (clone $instructorQuery)->skip($request->start - 1)->limit($request->batch)->get();

        foreach ($instructors as $instructor) {
            notify($instructor, 'DEFAULT', [
                'subject' => $request->subject,
                'message' => $request->message,
            ], [$request->via], pushImage: $imageUrl);
        }

        return $this->sessionForNotification($totalInstructorCount, $request);
    }


    private function sessionForNotification($totalInstructorCount, $request)
    {
 
        if (session()->has('SEND_NOTIFICATION')) {
            $sessionData                = session("SEND_NOTIFICATION");
            $sessionData['total_sent'] += $sessionData['batch'];
        } else {
            $sessionData               = $request->except('_token');
            $sessionData['total_sent'] = $request->batch;
            $sessionData['total_instructor'] = $totalInstructorCount;
        }

        $sessionData['start'] = $sessionData['total_sent'] + 1;

        if ($sessionData['total_sent'] >= $totalInstructorCount) {
            session()->forget("SEND_NOTIFICATION");
            $message = ucfirst($request->via) . " notifications were sent successfully";
            $url     = route("admin.instructors.notification.all");
        } else {
            session()->put('SEND_NOTIFICATION', $sessionData);
            $message = $sessionData['total_sent'] . " " . $sessionData['via'] . "  notifications were sent successfully";
            $url     = route("admin.instructors.notification.all") . "?email_sent=yes";
        }
        $notify[] = ['success', $message];
        return redirect($url)->withNotify($notify);
    }

    public function countBySegment($methodName){
        return Instructor::active()->$methodName()->count();
    }

    public function list()
    {
        $query = Instructor::active();

        if (request()->search) {
            $query->where(function ($q) {
                $q->where('email', 'like', '%' . request()->search . '%')->orWhere('username', 'like', '%' . request()->search . '%');
            });
        }
        $instructors = $query->orderBy('id', 'desc')->paginate(getPaginate());
        return response()->json([
            'success' => true,
            'instructors'   => $instructors,
            'more'    => $instructors->hasMorePages()
        ]);
    }

    public function notificationLog($id){
        $instructor = Instructor::findOrFail($id);
        $pageTitle = 'Notifications Sent to '.$instructor->username;
        $logs = NotificationLog::where('instructor_id',$id)->with('user')->orderBy('id','desc')->paginate(getPaginate());
        return view('admin.reports.notification_history', compact('pageTitle','logs','instructor'));
    }


}
