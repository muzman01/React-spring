package com.muzman.ws.shared;

import lombok.Data;

@Data
public class GenericResponse {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
