package com.DigitalBooking.service.interfaces;

import com.DigitalBooking.exceptions.ResourceNotFoundException;
import com.DigitalBooking.model.Branch;
import com.DigitalBooking.model.dto.BranchDTO;
import java.util.Set;

public interface BranchService {



       Branch addBranch(BranchDTO branchDTO);

        BranchDTO searchBranch(Integer id);


        void editBranch(BranchDTO branchDTO);

        void deleteBranch (Integer id) throws ResourceNotFoundException;

        Set<BranchDTO> listBranches();


    }


