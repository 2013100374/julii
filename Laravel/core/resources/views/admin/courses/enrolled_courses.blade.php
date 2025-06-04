@extends('admin.layouts.app')

@section('panel')
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body p-0">
                    <div class="table-responsive--sm table-responsive">
                        <table class="table table--light style--two custom-data-table">
                            <thead>
                                <tr>
                                    <th>@lang('Thumb')</th>
                                    <th>@lang('Title')</th>
                                    <th>@lang('Users')</th>
                                    <th>@lang('Category/Sub Category')</th>
                                    <th>@lang('Price')</th>
                                    <th>@lang('Popular')</th>
                                    <th>@lang('Status')</th>
                                    <th>@lang('Action')</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($enrolledCourses as $enrolledCourse)
                                    <tr>
                                        <td>
                                            <div class="user">
                                                <div class="thumb"><img
                                                        src="{{ getImage(getFilePath('courseImage') . '/' . $enrolledCourse->course->image, getFileSize('courseImage')) }}"
                                                        alt="{{ __($enrolledCourse->course->image) }}" class="plugin_bg"></div>
                                              
                                            </div>
                                        </td>
                                        <td>
                                            {{ __($enrolledCourse->course->title) }}
                                        </td>

                                        <td>

                                        {{ __($enrolledCourse->user->firstname .' '.$enrolledCourse->user->lastname)}} <br>
                                       <a href="{{route('admin.users.detail',$enrolledCourse->user_id )}}"><span>@</span>{{$enrolledCourse->user->username}}</a>
                                        </td>

                                        <td>
                                           <span class="text--primary">
                                               {{ __(@$enrolledCourse->course->category->name) }}
                                            </span> <br>
                                             {{__(@$enrolledCourse->course->subcategory->name)}}
                                        </td>
                                        <td>
                                            @if ($enrolledCourse->course->discount_price > 0)
                                                <del>{{ showAmount(@$enrolledCourse->course->price) }}</del> <br>

                                                {{ showAmount(@$enrolledCourse->course->price - @$enrolledCourse->course->discount) }}
                                            @else
                                                {{ showAmount(@$enrolledCourse->course->price) }}
                                            @endif
                                        </td>
                                        <td>
                                             @if (@$enrolledCourse->course->is_populer == Status::YES)
                                                 <span class="badge badge--success">@lang('Yes')</span>
                                             @else
                                                 <span class="badge badge--danger">@lang('No')</span>
                                             @endif
                                        </td>
                                        <td>
                                            @php
                                                echo $enrolledCourse->course->statusBadge;
                                            @endphp
                                        </td>
                                        <td>

                                            <div class="button--group">

                                                <a  class="btn btn-sm btn-outline--primary" href="{{route('admin.courses.details',$enrolledCourse->course->slug )}}" class="dropdown-item">
                                                    <i class="la la-desktop"></i>@lang('Details')
                                                </a>
                                             
                                            </div>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td class="text-muted text-center" colspan="100%">{{ __($emptyMessage) }}</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
                @if ($enrolledCourses->hasPages())
                <div class="card-footer py-4">
                    {{ paginateLinks($enrolledCourses) }}
                </div>
                @endif
            </div>
        </div>
    </div>

@endsection


@push('breadcrumb-plugins')
   <x-search-form/>
@endpush
