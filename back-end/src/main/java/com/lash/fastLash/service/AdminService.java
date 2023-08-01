package com.lash.fastLash.service;

import com.lash.fastLash.dto.Response.LoginResponseDTO;
import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AdminModel;
import com.lash.fastLash.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        if(adminRepository.findByUsuario(admin.getUsuario()).isPresent())
            throw new RequestException("Desculpe, este usuário já sendo utilizado, por favor digite outro!");

        admin.setRole("ROLE_USER");
        admin.setSenha(passwordEncoder.encode(admin.getSenha()));
        return adminRepository.save(admin);
    }

    public LoginResponseDTO fazerLogin(AdminModel admin){
        if(validarSenha(admin.getUsuario(), admin.getSenha())){
            AdminModel adminLogado = buscarUsuarioPorUsername(admin.getUsuario());
            return new LoginResponseDTO(
                tokenService.gerarToken(admin),
                adminLogado.getRole()
            );
        }else throw new RequestException("Credenciais incorretas!");
    }

    public AdminModel alterarRoleAdmin(Long codigo, String senha){
        if(passwordEncoder.matches(senha, senhaSistema)){
            AdminModel admin = buscarUsuarioPorCodigo(codigo);
            admin.setRole("ROLE_ADMIN");
            return  adminRepository.save(admin);
        }else throw new RequestException("Senha do sistema incorreta!");
    }


    //Métodos privados
    private boolean validarSenha(String usuario, String senha){
        return (passwordEncoder.matches(senha, buscarUsuarioPorUsername(usuario).getSenha()));
    }

    private AdminModel buscarUsuarioPorCodigo(Long codigo){
        return adminRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    private AdminModel buscarUsuarioPorUsername(String usuario){
        return adminRepository.findByUsuario(usuario)
               .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }
}
