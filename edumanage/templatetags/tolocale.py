from django import template

register = template.Library()

@register.tag
def tolocale(parser, token):
    try:
        tag_name, objtrans, format_string = token.split_contents()
    except ValueError:
        raise template.TemplateSyntaxError, "%r tag requires exactly two arguments" % token.contents.split()[0]
    return CurrentLocaleNode(objtrans, format_string)


class CurrentLocaleNode(template.Node):
    def __init__(self, objtrans, format_string):
        self.format_string = template.Variable(format_string)
        self.objtrans = template.Variable(objtrans)
    def render(self, context):
        objtrans = self.objtrans.resolve(context)
        translang = self.format_string.resolve(context)
        return tolocale_filter(objtrans, translang)


@register.filter(name='tolocale')
def tolocale_filter(objtrans, translang):
    try:
        return objtrans.get_name(lang=translang)
    except AttributeError:
        if isinstance(objtrans, dict):
            return objtrans.get(translang, '')
        else:
            return objtrans
