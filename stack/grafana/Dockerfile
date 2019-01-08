FROM grafana/grafana:latest

ADD ./stack/grafana/datasources /etc/grafana/provisioning/datasources/
ADD ./stack/grafana/dashboards /etc/grafana/dashboards/
ADD ./stack/grafana/conf/default_dashboard.yml /etc/grafana/provisioning/dashboards/

# WARNING: Do not expose username/password in PROD environment
ENV GF_SECURITY_ADMIN_PASSWORD=password\
    GF_SECURITY_ADMIN_USER=admin\
    GF_PATHS_PROVISIONING=/etc/grafana/provisioning/
