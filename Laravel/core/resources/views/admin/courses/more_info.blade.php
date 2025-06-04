<div class="card">
    <div class="card-body">
        <div class="accordion custom--accordion-two" id="courseDetailsAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="detailsHeading">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#detailsCollapse">
                        {{ __('Course Details') }}
                    </button>
                </h2>
                <div id="detailsCollapse" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        <ul class="caption-list">
                            <li><span class="caption">@lang('Instructor')</span>
                                <span class="value">
                                    {{ $course->instructor->fistname . ' ' . $course->instructor->lastname }}
                                </span>
                            </li>
    
                            @if($course->duration)
                            <li><span class="caption">@lang('Discount Duration')
                                </span>
                                <span class="value">
    
                                    @if ($course->duration >= now())
                                       <span class="text--success">{{showDateTime($course->duration)}}</span>
                                    @else
                                    <span class="text--danger">{{showDateTime($course->duration)}}</span>
                                    @endif
                                </span>
                            </li>
    
                            <li><span class="caption">@lang('Course Discount')
                                </span>
                                <span class="value">
    
                                    @if ($course->discount_type == Status::PERCENT)
                                        {{ getAmount($course->discount) . '%' }}
                                    @else
                                        {{ showAmount($course->discount) }}
                                    @endif
                                </span>
    
    
                            </li>
                            @endif
                        
                            <li><span class="caption">@lang('Price')
                                </span>
                                <span class="value">
                                    @if ($course->discount_price > 0)
                                        <del>
                                            {{ showAmount($course->price) }}
                                        </del> <br>
    
                                        {{ showAmount($course->price - $course->discount_price) }}
                                    @else
                                        {{ showAmount($course->price) }}
                                    @endif
    
                                </span>
    
                            </li>
                            <li><span class="caption">@lang('Status')</span>
                                <span class="value">
                                    @php
    
                                        echo $course->statusBadge;
                                    @endphp
    
                                </span>
                            </li>
                            <li><span class="caption">@lang('Total Sections')</span> <span
                                    class="value">{{ count($course->sections) }} @lang('Sections')</span></li>
                            <li><span class="caption">@lang('Total Lecture')</span> <span
                                    class="value">{{ count($course->lectures) }} @lang('lectures')</span></li>
                            <li><span class="caption">@lang('Total Quiz')</span> <span
                                    class="value">{{ count($course->quizzes) }} @lang('Quizzes')</span></li>
                            <li><span class="caption">@lang('Level')</span>
                                <span class="value">
                                    @php
                                        echo $course->levelBadge;
                                    @endphp
                                </span>
                            </li>
                            <li><span class="caption">@lang('Total Enrolled')</span>
                                <span class="value">
                                    {{ $enrolledUsers }} @lang('Students')
                                </span>
                            </li>
                            <li><span class="caption">@lang('Complate Course')
                                </span>
                                <span class="value">
                                    {{ $course->total_complete }} @lang('Students')
                                </span>
    
                            </li>
    
                        </ul>
                    </div>
                </div>
            </div>
    
            @if (count($course->requirements) > 0)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="requirementsHeading">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#requirementsCollapse">
                            {{ __('Course Requirements') }}
                        </button>
                    </h2>
                    <div id="requirementsCollapse" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <ul class="caption-list">
                                @foreach ($course->requirements as $req)
                                    <li><i class="las la-check"></i> <span
                                            class="value">{{ $req->requirement }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif
    
            @if (count($course->contents) > 0)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="contentHeading">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#contentCollapse">
                            {{ __('Who this course is for:') }}
                        </button>
                    </h2>
                    <div id="contentCollapse" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <ul class="caption-list">
                                @foreach ($course->contents as $item)
                                    <li><i class="las la-check"></i> <span class="value">{{ $item->content }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif
    
            @if (count($course->objects) > 0)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="learningHeading">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#learningCollapse">
                            {{ __('What you\'ll learn') }}
                        </button>
                    </h2>
                    <div id="learningCollapse" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <ul class="caption-list">
                                @foreach ($course->objects as $item)
                                    <li><i class="las la-check"></i> <span class="value">{{ $item->object }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>
</div>
