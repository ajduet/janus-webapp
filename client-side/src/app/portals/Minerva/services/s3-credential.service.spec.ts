import { TestBed, inject } from '@angular/core/testing';

import { S3CredentialService } from './s3-credential.service';

describe('S3CredentialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S3CredentialService]
    });
  });

  it('should be created', inject([S3CredentialService], (service: S3CredentialService) => {
    expect(service).toBeTruthy();
  }));
});
