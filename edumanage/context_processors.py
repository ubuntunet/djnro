from django.conf import settings


def country_code(context):
    # return the value you want as a dictionnary. you may add multiple values in there.
    return {
        'MAP_CENTER': settings.MAP_CENTER,
        'VERSION': settings.SW_VERSION
    }


def cat_instances(context):
    return {'CAT_INSTANCES': settings.CAT_INSTANCES}
