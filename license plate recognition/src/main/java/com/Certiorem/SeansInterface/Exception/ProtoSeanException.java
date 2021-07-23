package com.Certiorem.SeansInterface.Exception;

import net.bytebuddy.implementation.bind.annotation.Super;
import org.aspectj.weaver.ast.Var;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProtoSeanException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ProtoSeanException(String message){
        super(message);
    }


}
