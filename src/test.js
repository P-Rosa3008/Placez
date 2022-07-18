export const mapOptions = {
  zoom: 10,
  backgroundColor: "#FFF",
  disableDefaultUI: true,
  draggable: false,
  scaleControl: false,
  scrollwheel: false,

  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "landscape",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {},
  ],
};

{
  /* <TabsContext value={tabIndex}>
          <TabList
            variant="scrollable"
            scrollButtons={false}
            onChange={handleChange}
          >
            <Tab value="1" label="[A - D]" />
            <Tab value="2" label="[E - H]" />
            <Tab value="3" label="[I - L]" />
            <Tab value="4" label="[M - P]" />
            <Tab value="5" label="[Q - T]" />
            <Tab value="6" label="[U - Z]" />
          </TabList>
          <TabPanel value="1"></TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3"></TabPanel>
          <TabPanel value="4"></TabPanel>
          <TabPanel value="5"></TabPanel>
          <TabPanel value="6"></TabPanel>
        </TabsContext> */
}
