package com.oak.main;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.resource.Resource;

public class OakStartUp {

	// private static final int DEFAULT_PORT = 8080;
	private static final int DEFAULT_PORT = 8080;
	private static final String CONTEXT_PATH = "/";
	private static final String RESOURCE_BASE = "static";
	

	public static void main(String[] args) throws Exception {
		Server server = new Server(DEFAULT_PORT);

		System.out.println(Resource.newClassPathResource("static").toString());
		
		// 1.Creating the resource handler
		ResourceHandler resourceHandler = new ResourceHandler();

		// 2.Setting Resource Base
		resourceHandler.setResourceBase(Resource.newClassPathResource("static").toString());

		// 3.Enabling Directory Listing
		resourceHandler.setDirectoriesListed(false);

		// 4.Setting Context Source
		ContextHandler contextHandler = new ContextHandler(CONTEXT_PATH);

		// 5.Attaching Handlers
		contextHandler.setHandler(resourceHandler);
		server.setHandler(contextHandler);

		// 6.Start the Server

		server.start();
		System.out.println("Started!");
		server.join();
	}

}
