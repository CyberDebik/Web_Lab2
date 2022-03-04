package com.cyberdebik.servlets;

class Point {
	double x;
	double y;
	double R;
	boolean isInArea;

	Point(double x, double y, double r) {
		this.x = x;
		this.y = y;
		this.R = r;
	}

	@Override
	public String toString() {
		return "<tr>" +
				"<td>" +
				String.format("%.2f", x) +
				"</td>" +
				"<td>" +
				String.format("%.2f", y) +
				"</td>" +
				"<td>" +
				String.format("%.2f", R) +
				"</td>" +
				"<td>" +
				(isInArea ? "Yes" : "No") +
				"</td>" +
				"</tr>";
	}
}