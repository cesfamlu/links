
public interface PasswordEncryptionStrategy {
    String encrypt(String password);
    String decrypt(String encryptedPassword);
}


public class AESEncryptionStrategy implements PasswordEncryptionStrategy {
    
}

public class TripleDESEncryptionStrategy implements PasswordEncryptionStrategy {
    
}


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
    
    }
}

public interface CredentialValidator {
    boolean validate(String username, String password);
}


public class SQLCredentialValidator implements CredentialValidator {
    
}


public class ActiveDirectoryCredentialValidator implements CredentialValidator {

}


public class EventLogger {
    public void logEvent(String username, LocalDateTime dateTime) {
        
    }
}
