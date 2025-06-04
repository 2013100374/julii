<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Lib\FormProcessor;
use Illuminate\Http\Request;

class KycController extends Controller
{
    public function setting()
    {
        $pageTitle = 'Users KYC Setting';
        $form = Form::where('act','kyc')->first();
        return view('admin.kyc.setting',compact('pageTitle','form'));
    }

    public function settingUpdate(Request $request)
    {
        $formProcessor = new FormProcessor();
        $generatorValidation = $formProcessor->generatorValidation();
        $request->validate($generatorValidation['rules'],$generatorValidation['messages']);
        $exist = Form::where('act','kyc')->first();
        $formProcessor->generate('kyc',$exist,'act');

        $notify[] = ['success','KYC data updated successfully'];
        return back()->withNotify($notify);
    }


    public function instructorKycSetting()
    {
        $pageTitle = 'Instructors KYC Setting';
        $form = Form::where('act','instructor_kyc')->first();
        return view('admin.kyc.instructor.setting',compact('pageTitle','form'));
    }

    public function instructorKycSettingUpdate(Request $request)
    {
        $formProcessor = new FormProcessor();
        $generatorValidation = $formProcessor->generatorValidation();
        $request->validate($generatorValidation['rules'],$generatorValidation['messages']);
        $exist = Form::where('act','instructor_kyc')->first();
        $formProcessor->generate('instructor_kyc',$exist,'act');

        $notify[] = ['success','KYC data updated successfully'];
        return back()->withNotify($notify);
    }

}
