-- CreateIndex
CREATE INDEX "Earthquakes_date_latitude_longitude_depth_magnitude_locatio_idx" ON "Earthquakes"("date" DESC, "latitude", "longitude", "depth", "magnitude", "location", "city");
