package com.lash.fastLash.service;

import com.lash.fastLash.dto.Response.LoginResponseDTO;
import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AdminModel;
import com.lash.fastLash.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${senha.sistema}")
    private String senhaSistema;


    public AdminModel salvarAdmin(AdminModel admin){
        if(adminRepository.buscarAdminPorUsuario(admin.getUsuario()).isPresent())
            throw new RequestException("Desculpe, este usuário já sendo utilizado, por favor digite outro!");

        admin.setRole("ROLE_USER");
        admin.setSenha(passwordEncoder.encode(admin.getSenha()));
        return adminRepository.save(admin);
    }

    public LoginResponseDTO fazerLogin(String usuario, String senha){
        if(validarSenha(usuario, senha)){
            AdminModel admin = verificarSeAdminExistePorUsuario(usuario);
            return  new LoginResponseDTO(
                tokenService.gerarToken(admin),
                admin.getRole()
            );
        }else throw new RequestException("Credenciais incorretas!");
    }

    public AdminModel alterarRoleAdmin(Long codigo, String senha){
        if(passwordEncoder.matches(senha, senhaSistema)){
            AdminModel admin = verificarSeAdminExistePorCodigo(codigo);
            admin.setRole("ROLE_ADMIN");
            return  adminRepository.save(admin);
        }else throw new RequestException("Senha do sistema incorreta!");
    }


    //Validações
    public boolean validarSenha(String usuario, String senha){
        return (passwordEncoder.matches(senha, verificarSeAdminExistePorUsuario(usuario).getSenha()));
    }

    public AdminModel verificarSeAdminExistePorCodigo(Long codigo){
        Optional<AdminModel> admin = adminRepository.buscarAdminPorID(codigo);
        if(admin.isEmpty()) throw new RequestException("usuário inexistente!");
        else return  admin.get();
    }

    public AdminModel verificarSeAdminExistePorUsuario(String usuario){
        Optional<AdminModel> admin = adminRepository.buscarAdminPorUsuario(usuario);
        if(admin.isEmpty()) throw new RequestException("usuário inexistente!");
        else return  admin.get();
    }
}
