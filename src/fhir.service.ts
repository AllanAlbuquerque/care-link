import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class FhirService {
  private readonly fhirBaseUrl = 'https://fiapfhirworkspace-fiapsp.fhir.azurehealthcareapis.com';
  private readonly clientId = '821b382a-73a5-49ff-b300-94577465df05';
  private readonly clientSecret = 'Xpj8Q~xVMR0OSqhShIpNv7Lz8FEdN-7mC7izXdqW';

  constructor(private readonly httpService: HttpService) {}

  private async getAccessToken(): Promise<string> {
    const tokenUrl = 'https://login.microsoftonline.com/2e7aa805-33f7-4f63-a657-e59637f27819/oauth2/token';
    
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('resource', this.fhirBaseUrl);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await this.httpService.post(tokenUrl, data.toString(), config).toPromise();
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      throw new Error('Failed to get access token.');
    }
  }

  async createResource(resourceType: string, data: any): Promise<any> {
    const accessToken = await this.getAccessToken();
    const url = `${this.fhirBaseUrl}/${resourceType}`;
    
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/fhir+json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await this.httpService.post(url, data, config).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw new Error(`Failed to create ${resourceType}.`);
    }
  }

  async getResource(resourceType: string, id: string): Promise<any> {
    const accessToken = await this.getAccessToken();
    const url = `${this.fhirBaseUrl}/${resourceType}/${id}`;
    
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/fhir+json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await this.httpService.get(url, config).toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`Failed to retrieve ${resourceType} with ID ${id}.`);
    }
  }

  async updateResource(resourceType: string, id: string, data: any): Promise<void> {
    const accessToken = await this.getAccessToken();
    const url = `${this.fhirBaseUrl}/${resourceType}/${id}`;
    
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/fhir+json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await this.httpService.put(url, data, config).toPromise();
    } catch (error) {
      throw new Error(`Failed to update ${resourceType} with ID ${id}.`);
    }
  }

  async deleteResource(resourceType: string, id: string): Promise<void> {
    const accessToken = await this.getAccessToken();
    const url = `${this.fhirBaseUrl}/${resourceType}/${id}`;
    
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await this.httpService.delete(url, config).toPromise();
    } catch (error) {
      throw new Error(`Failed to delete ${resourceType} with ID ${id}.`);
    }
  }
}
