package com.cyberdebik.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;

@WebServlet(name = "areaCheckServlet", value = "/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    static ArrayList<Point> table = new ArrayList<>();

    private static boolean checkArea(double x, double y, double R) {
        boolean first_check = false;
        boolean second_check = false;
        boolean third_check = false;
        //сектор
        if (x >= 0 && y >= 0 && x * x + y * y <= R * R) {
            first_check = true;
        }
        //треугольник
        if (x <= 0 && y <= 0 && y >= -(R / 2) - x) {
            second_check = true;
        }
        //прямоугольник
        if (x >= 0 && y <= 0 && x <= R / 2 && Math.abs(y) <= Math.abs(R)) {
            third_check = true;
        }
        return first_check || second_check || third_check;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(-1);
        try {
            Point p = new Point(
                    Double.parseDouble(request.getParameter("X")),
                    Double.parseDouble(request.getParameter("Y")),
                    Double.parseDouble(request.getParameter("R"))
            );
            if (checkData(p.x, p.y, p.R)) {
                p.isInArea = checkArea(p.x, p.y, p.R);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            }
            table.add(p);
            session.setAttribute("table", printPoints());
        } catch (Exception e) {
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
        PrintWriter out = response.getWriter();
        if (request.getParameter("silent") != null && request.getParameter("silent").equals("on")) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print("{\"in_area\":" + (table.get(table.size() - 1).isInArea ? "true" : "false") + ",\"data\":\"" + table.get(table.size() - 1) + "\"}");
            log("{\"in_area\":" + (table.get(table.size() - 1).isInArea ? "true" : "false") + ",\"data\":\"" + table.get(table.size() - 1) + "\"}");
            out.flush();
        } else {
            getServletContext().getRequestDispatcher("/results.jsp").forward(request, response);
        }
    }

    static String printPoints() {
        StringBuilder data = new StringBuilder();
        for (Point p : table)
            data.append((p).toString());
        return data.toString();
    }

    private boolean checkData(double x, double y, double r) {
        Double[] xInterval = {-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0};
        Double[] rInterval = {1.0, 1.5, 2.0, 2.5, 3.0};
        return ((Arrays.asList(xInterval).contains(x) || (x >= -3.0 && x <= 5.0)) && y > -5 && y < 5 && Arrays.asList(rInterval).contains(r));
    }

}