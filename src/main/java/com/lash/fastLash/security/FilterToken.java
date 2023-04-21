package com.lash.fastLash.security;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.lash.fastLash.repository.AdminRepository;
import com.lash.fastLash.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FilterToken extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AdminRepository adminRepository;

    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token;
        var authorization = request.getHeader("Authorization");

        try {
            if (authorization != null) {
                token = authorization.replace("Bearer ", "");

                var subject = tokenService.getSubject(token);

                var usuario = adminRepository.buscarAdminPorUsuario(subject).get();

                var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        catch (TokenExpiredException e){
        }

        filterChain.doFilter(request, response);
    }
}
