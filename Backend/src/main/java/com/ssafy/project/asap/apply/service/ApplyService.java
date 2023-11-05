package com.ssafy.project.asap.apply.service;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.domain.ApiMethod;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import com.ssafy.project.asap.apply.entity.dto.request.ApproveApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.request.RegisterApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.request.UpdateApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplyResponse;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplysResponse;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import com.ssafy.project.asap.category.repository.CategoryRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ApplyService {

    private final ApplyRepository applyRepository;
    private final MemberRepository memberRepository;
    private final ApiRepository apiRepository;
    private final CategoryRepository categoryRepository;

    public FindApplyResponse findByApplyId(long applyId){

        log.info("applyId = " + applyId);

        return new FindApplyResponse(applyRepository.findByApplyId(applyId));

    }

    @Transactional
    public void signup(RegisterApplyRequest request, String id){

        applyRepository.findByApiAndMethod(request.getApi(), request.getMethod())
                .ifPresent((e) -> {
                    throw new CustomException(ErrorCode.APPLY_DUPLICATED);
                });

        Apply apply = Apply.builder()
                .api(request.getApi())
                .title(request.getTitle())
                .content(request.getContent())
                .input(request.getInput())
                .inputExample(request.getInputExample())
                .output(request.getOutput())
                .outputExample(request.getOutputExample())
                .progress(ApplyProgress.대기)
                .price(request.getPrice())
                .method(request.getMethod())
                .member(memberRepository.findById(id).get())
                .provideDate(request.getProvideDate())
                .tags(request.getTags())
                .build();

        applyRepository.save(apply);

    }

    public List<FindApplysResponse> findByMember(Member member){

        List<FindApplysResponse> list = new ArrayList<>();

        for(Apply apply : applyRepository.findByMember(member)){
            list.add(new FindApplysResponse(apply));
        }

        return list;

    }

    public List<FindApplysResponse> findAll() {

        List<FindApplysResponse> list = new ArrayList<>();

        for(Apply apply : applyRepository.findAll(Sort.by(Sort.Direction.DESC, "createDate"))){
            list.add(new FindApplysResponse(apply));
        }

        return list;

    }

    @Transactional
    public void updateProgress(UpdateApplyRequest updateApplyRequest){

        Apply apply = applyRepository.findByApplyId(updateApplyRequest.getApplyId());

        apply.setProgress(updateApplyRequest.getProgress());

    }

    @Transactional
    public void rejectProgress(Long applyId){

        Apply apply = applyRepository.findByApplyId(applyId);

        apply.setProgress(ApplyProgress.거절);

    }

    @Transactional
    public Long approveProgress(ApproveApplyRequest request){

        Apply apply = applyRepository.findByApplyId(request.getApplyId());

        Api api = Api.builder()
                .api(request.getApi())
                .title(apply.getTitle())
                .content(apply.getContent())
                .price(apply.getPrice())
                .input(apply.getInput())
                .inputExample(apply.getInputExample())
                .output(apply.getOutput())
                .outputExample(apply.getOutputExample())
                .member(apply.getMember())
                .provideDate(apply.getProvideDate())
                .method(ApiMethod.mapApplyMethodToApiMethod(apply.getMethod()))
                .tags(apply.getTags())
                .category(categoryRepository.findByCategory(request.getCategory())
                        .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)))
                .build();

        apiRepository.save(api);

        log.info("apiId = " + api.getApiId());

        apply.setProgress(ApplyProgress.승인);

        return api.getApiId();

    }
}
