package com.cyberdebik.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "controllerServlet", value = "/controllerServlet")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getPathInfo().substring(1);
        log("OkGet");
        if (name.equals("check"))
            request.getServletContext().getRequestDispatcher("/check").forward(request, response);
        else {
            request.getServletContext().getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log("OkPost");
        log(request.getParameterMap().toString());
        String xString = request.getParameter("X");
        String yString = request.getParameter("Y");
        String RString = request.getParameter("R");
        if (xString == null || yString == null || RString == null) {
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
//            log("error");
        } else {
            request.getServletContext().getRequestDispatcher("/areaCheckServlet").forward(request, response);
//            log("ok");
        }
    }
}
