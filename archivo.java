// Interfaz para el cifrado de contraseñas
public interface PasswordEncryptionStrategy {
    String encrypt(String password);
    String decrypt(String encryptedPassword);
}

// Implementaciones concretas de cifrado
public class AESEncryptionStrategy implements PasswordEncryptionStrategy {
    // Implementación de cifrado AES
}

public class TripleDESEncryptionStrategy implements PasswordEncryptionStrategy {
    // Implementación de cifrado TripleDES
}

// Clase para autenticar usuarios
public class UserAuthenticator {
    private PasswordEncryptionStrategy encryptionStrategy;
    private CredentialValidator credentialValidator;
    private EventLogger eventLogger;

    public UserAuthenticator(PasswordEncryptionStrategy encryptionStrategy, CredentialValidator credentialValidator, EventLogger eventLogger) {
        this.encryptionStrategy = encryptionStrategy;
        this.credentialValidator = credentialValidator;
        this.eventLogger = eventLogger;
    }

    public AuthenticationResult authenticate(String username, String password) {
        // Implementación de autenticación
    }
}

// Interfaz para la validación de credenciales  
public interface CredentialValidator {
    boolean validate(String username, String password);
}

// Implementación concreta para base de datos SQL
public class SQLCredentialValidator implements CredentialValidator {
    // Implementación para validación SQL
}

// Implementación futura para el directorio activo
public class ActiveDirectoryCredentialValidator implements CredentialValidator {
    // Implementación para el directorio activo
}

// Clase para registrar eventos
public class EventLogger {
    public void logEvent(String username, LocalDateTime dateTime) {
        // Implementación para registrar eventos en un archivo de texto
    }
}