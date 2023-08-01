package com.lash.fastLash.controller;

import com.lash.fastLash.dto.Request.AdminRequestDTO;
import com.lash.fastLash.dto.Response.AdminResponseDTO;
import com.lash.fastLash.model.AdminModel;
import com.lash.fastLash.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ModelMapper modelMapper;

    private AdminResponseDTO converterAdminEmAdminResponseDTO(AdminModel adminModel){
        return modelMapper.map(adminModel, AdminResponseDTO.class);
    }

    private AdminModel converterAdminRequestDTOEmAdmin(AdminRequestDTO adminRequest){
        return modelMapper.map(adminRequest, AdminModel.class);
    }


    @PostMapping
    public ResponseEntity<?> salvarAdmin(@RequestBody AdminRequestDTO adminRequest){
        AdminModel admin = adminService.salvarAdmin(converterAdminRequestDTOEmAdmin(adminRequest));
        return new ResponseEntity<>(converterAdminEmAdminResponseDTO(admin), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> fazerLogin(@RequestBody AdminRequestDTO adminRequest){
        return new ResponseEntity<>(adminService.fazerLogin(converterAdminRequestDTOEmAdmin(adminRequest)), HttpStatus.OK);
    }

    @PutMapping(path = "alterarRole/{codigo}/{senha}")
    public ResponseEntity<?> alterarRoleAdmin(@PathVariable Long codigo,
                                              @PathVariable String senha){
        return new ResponseEntity<>(converterAdminEmAdminResponseDTO(adminService.alterarRoleAdmin(codigo, senha)), HttpStatus.OK);
    }
}
