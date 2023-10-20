package com.DigitalBooking.service.impl;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Branch;
import com.DigitalBooking.model.dto.BranchDTO;
import com.DigitalBooking.repository.BranchRepository;
import com.DigitalBooking.service.interfaces.BranchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@AllArgsConstructor
@Transactional
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final ObjectMapper mapper;
    private static  final Logger log= Logger.getLogger(BranchServiceImpl.class);

    @Override
    public Branch addBranch(BranchDTO branchDTO) {
        Branch branch = null;

        if(branchDTO.getId() != null) {
            branch = branchRepository.findById(branchDTO.getId()).orElse(null);
        }
        if (branch == null) {
            branch = mapper.convertValue(branchDTO, Branch.class);
            log.info("Branch "+branchDTO.getName() +" has been created");
            branch = branchRepository.save(branch);
        }
        return branch;
    }

    @Override
    public BranchDTO searchBranch(Integer id) {
        Optional<Branch> branch = branchRepository.findById(id);
        BranchDTO branchDTO = null;
        if (branch.isPresent())
            branchDTO = mapper.convertValue(branch, BranchDTO.class);
        log.info("Branch " + id+" has been found");

        return branchDTO;
    }

    @Override
    public void editBranch(BranchDTO branchDTO) {
        Branch branch = mapper.convertValue(branchDTO, Branch.class);
        branchRepository.save(branch);
        log.info("Branch " + branchDTO.getId()+" has been found");
    }

    @Override
    public void deleteBranch(Integer id) throws ResourceNotFoundException {
        branchRepository.softDelete(id);
        log.info("Branch " + id + " has been deleted");
        if (searchBranch(id) == null)
            throw new ResourceNotFoundException("No existe branch con id " + id);
        log.error("Branch "+id+" has been deleted");
    }


    @Override
    public Set<BranchDTO> listBranches() {
        List<Branch> branches = branchRepository.findByDelete();
        Set<BranchDTO> branchDTOS = new HashSet<>();

        for (Branch branch : branches) {
            branchDTOS.add(mapper.convertValue(branch, BranchDTO.class));
        }
        log.info("Branch list has been created");
        return branchDTOS;
    }


}
