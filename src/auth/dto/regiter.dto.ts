import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';


export class RegisterDto {
    @IsEmail({}, {message: 'Debe ser un email válido'})
    @IsNotEmpty({message: 'El email es requerido'})
    email: string;


    @IsString({message: 'La contraseña debe ser un string'})
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    @MaxLength(50, {message: 'La contraseña no puede exceder 50 caracteres'})
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
            message: 'La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial'
        }
    )
    password: string;
}